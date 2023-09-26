/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
    Context,
    Pda,
    PublicKey,
    Signer,
    TransactionBuilder,
    transactionBuilder,
} from '@metaplex-foundation/umi';
import {
    Serializer,
    mapSerializer,
    struct,
    u8,
} from '@metaplex-foundation/umi/serializers';
import { findMasterEditionPda } from '../accounts';
import {
    ResolvedAccount,
    ResolvedAccountsWithIndices,
    expectPublicKey,
    getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type ThawDelegatedAccountInstructionAccounts = {
    /** Delegate */
    delegate: Signer;
    /** Token account to thaw */
    tokenAccount: PublicKey | Pda;
    /** Edition */
    edition?: PublicKey | Pda;
    /** Token mint */
    mint: PublicKey | Pda;
    /** Token Program */
    tokenProgram?: PublicKey | Pda;
};

// Data.
export type ThawDelegatedAccountInstructionData = { discriminator: number };

export type ThawDelegatedAccountInstructionDataArgs = {};

export function getThawDelegatedAccountInstructionDataSerializer(): Serializer<
    ThawDelegatedAccountInstructionDataArgs,
    ThawDelegatedAccountInstructionData
> {
    return mapSerializer<
        ThawDelegatedAccountInstructionDataArgs,
        any,
        ThawDelegatedAccountInstructionData
    >(
        struct<ThawDelegatedAccountInstructionData>([['discriminator', u8()]], {
            description: 'ThawDelegatedAccountInstructionData',
        }),
        (value) => ({ ...value, discriminator: 27 })
    ) as Serializer<
        ThawDelegatedAccountInstructionDataArgs,
        ThawDelegatedAccountInstructionData
    >;
}

// Instruction.
export function thawDelegatedAccount(
    context: Pick<Context, 'eddsa' | 'programs'>,
    input: ThawDelegatedAccountInstructionAccounts
): TransactionBuilder {
    // Program ID.
    const programId = context.programs.getPublicKey(
        'mplTokenMetadata',
        'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );

    // Accounts.
    const resolvedAccounts: ResolvedAccountsWithIndices = {
        delegate: { index: 0, isWritable: true, value: input.delegate ?? null },
        tokenAccount: {
            index: 1,
            isWritable: true,
            value: input.tokenAccount ?? null,
        },
        edition: { index: 2, isWritable: false, value: input.edition ?? null },
        mint: { index: 3, isWritable: false, value: input.mint ?? null },
        tokenProgram: {
            index: 4,
            isWritable: false,
            value: input.tokenProgram ?? null,
        },
    };

    // Default values.
    if (!resolvedAccounts.edition.value) {
        resolvedAccounts.edition.value = findMasterEditionPda(context, {
            mint: expectPublicKey(resolvedAccounts.mint.value),
        });
    }
    if (!resolvedAccounts.tokenProgram.value) {
        resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
            'splToken',
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        );
        resolvedAccounts.tokenProgram.isWritable = false;
    }

    // Accounts in order.
    const orderedAccounts: ResolvedAccount[] = Object.values(
        resolvedAccounts
    ).sort((a, b) => a.index - b.index);

    // Keys and Signers.
    const [keys, signers] = getAccountMetasAndSigners(
        orderedAccounts,
        'programId',
        programId
    );

    // Data.
    const data = getThawDelegatedAccountInstructionDataSerializer().serialize(
        {}
    );

    // Bytes Created On Chain.
    const bytesCreatedOnChain = 0;

    return transactionBuilder([
        {
            instruction: { keys, programId, data },
            signers,
            bytesCreatedOnChain,
        },
    ]);
}
