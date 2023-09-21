import {
    BroadcastData,
    SolanaBlockMessage,
    SolanaDatBroadcastType,
    SolanaDatastoreName,
} from '../types';
import { SolanaProcessor } from './processor';
import { SolanaBlockModel } from 'types/src/models/solana/block';
import { SolanaRewardModel } from 'types/src/models/solana/reward';

export class SolanaBlockProcessor extends SolanaProcessor<SolanaBlockMessage> {
    protected async __process(
        data: BroadcastData<SolanaBlockMessage>
    ): Promise<void> {
        const datastore = await this.providers.datastoreProvider(
            SolanaDatastoreName.BlockDatastore
        );
        const logger = this.providers.logProvider();
        const serviceProvider = await this.providers.serviceProvider();
        const dataBroadcasterProvider =
            await this.providers.dataBroadcasterProvider();
        const block = await serviceProvider.getBlock(data.payload.slot);
        const _block: SolanaBlockModel = {
            slot: data.payload.slot,
            parent_slot: data.payload.parentSlot,
            block_hash: data.payload.blockhash,
            block_time: data.payload.blockTime as number,
            block_height: data.payload.blockHeight,
            block_date: new Date(data.payload.blockTime as number),
            tx_count: block.transactions.length,
            tx_success_count: 0,
            tx_error_count: 0,
            successful_vote_txn_count: 0,
            failed_vote_txn_count: 0,
            successful_non_vote_txn_count: 0,
            failed_non_vote_txn_count: 0,
            total_vote_txn_count: 0,
            total_non_vote_txn_count: 0,
        };

        await datastore.insert(_block);
        logger.info(`Inserted block ${data.payload.slot} into datastore`);

        if (data.payload.rewards) {
            await this.__processReward(data);
        }

        for (const txn of block.transactions) {
            const signature = txn.transaction.signatures[0];
            await dataBroadcasterProvider.broadcast({
                id: signature,
                data: {
                    target: SolanaDatBroadcastType.TransactionBroadcast,
                    payload: signature,
                },
            });
            logger.info(
                `Broadcasted transaction ${signature} for block ${data.payload.slot}`
            );
        }
    }

    private async __processReward(data: BroadcastData<SolanaBlockMessage>) {
        const datastore = await this.providers.datastoreProvider(
            SolanaDatastoreName.RewardDatastore
        );
        const logger = this.providers.logProvider();

        if (!data.payload.rewards) {
            return;
        }

        const rewards: SolanaRewardModel[] = data.payload.rewards.map(
            (reward) => {
                const preBalance =
                    reward.postBalance === null
                        ? 0
                        : reward.postBalance -
                          reward.lamports -
                          (reward.commission ?? 0);
                return {
                    recipient: reward.pubkey,
                    lamports: reward.lamports,
                    commission: reward.commission,
                    reward_type: reward.rewardType,
                    post_balance: reward.postBalance ?? 0,
                    pre_balance: preBalance,
                    block_hash: data.payload.blockhash,
                    slot: data.payload.slot,
                    block_time: data.payload.blockTime as number,
                };
            }
        );

        await datastore.batchInsert(rewards);
        logger.info(
            `Inserted ${rewards.length} rewards into datastore for block ${data.payload.slot}`
        );
    }
}
