/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { findAssociatedTokenPda } from '@metaplex-foundation/mpl-toolbox';
import {
    Context,
    Option,
    OptionOrNullable,
    Pda,
    PublicKey,
    Signer,
    TransactionBuilder,
    none,
    publicKey,
    transactionBuilder,
} from '@metaplex-foundation/umi';
import {
    Serializer,
    mapSerializer,
    option,
    struct,
    u8,
} from '@metaplex-foundation/umi/serializers';
import { resolveIsNonFungible, resolveOptionalTokenOwner } from '../../hooked';
import {
    findMasterEditionPda,
    findMetadataPda,
    findTokenRecordPda,
} from '../accounts';
import {
    ResolvedAccount,
    ResolvedAccountsWithIndices,
    expectPublicKey,
    getAccountMetasAndSigners,
} from '../shared';
import {
    AuthorizationData,
    AuthorizationDataArgs,
    TokenStandard,
    TokenStandardArgs,
    getAuthorizationDataSerializer,
} from '../types';

// Accounts.
export type UnlockV1InstructionAccounts = {
    /** Delegate or freeze authority */
    authority?: Signer;
    /** Token owner account */
    tokenOwner?: PublicKey | Pda;
    /** Token account */
    token?: PublicKey | Pda;
    /** Mint account */
    mint: PublicKey | Pda;
    /** Metadata account */
    metadata?: PublicKey | Pda;
    /** Edition account */
    edition?: PublicKey | Pda;
    /** Token record account */
    tokenRecord?: PublicKey | Pda;
    /** Payer */
    payer?: Signer;
    /** System program */
    systemProgram?: PublicKey | Pda;
    /** System program */
    sysvarInstructions?: PublicKey | Pda;
    /** SPL Token Program */
    splTokenProgram?: PublicKey | Pda;
    /** Token Authorization Rules Program */
    authorizationRulesProgram?: PublicKey | Pda;
    /** Token Authorization Rules account */
    authorizationRules?: PublicKey | Pda;
};

// Data.
export type UnlockV1InstructionData = {
    discriminator: number;
    unlockV1Discriminator: number;
    authorizationData: Option<AuthorizationData>;
};

export type UnlockV1InstructionDataArgs = {
    authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getUnlockV1InstructionDataSerializer(): Serializer<
    UnlockV1InstructionDataArgs,
    UnlockV1InstructionData
> {
    return mapSerializer<
        UnlockV1InstructionDataArgs,
        any,
        UnlockV1InstructionData
    >(
        struct<UnlockV1InstructionData>(
            [
                ['discriminator', u8()],
                ['unlockV1Discriminator', u8()],
                ['authorizationData', option(getAuthorizationDataSerializer())],
            ],
            { description: 'UnlockV1InstructionData' }
        ),
        (value) => ({
            ...value,
            discriminator: 47,
            unlockV1Discriminator: 0,
            authorizationData: value.authorizationData ?? none(),
        })
    ) as Serializer<UnlockV1InstructionDataArgs, UnlockV1InstructionData>;
}

// Extra Args.
export type UnlockV1InstructionExtraArgs = { tokenStandard: TokenStandardArgs };

// Args.
export type UnlockV1InstructionArgs = UnlockV1InstructionDataArgs &
    UnlockV1InstructionExtraArgs;

// Instruction.
export function unlockV1(
    context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
    input: UnlockV1InstructionAccounts & UnlockV1InstructionArgs
): TransactionBuilder {
    // Program ID.
    const programId = context.programs.getPublicKey(
        'mplTokenMetadata',
        'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );

    // Accounts.
    const resolvedAccounts: ResolvedAccountsWithIndices = {
        authority: {
            index: 0,
            isWritable: false,
            value: input.authority ?? null,
        },
        tokenOwner: {
            index: 1,
            isWritable: false,
            value: input.tokenOwner ?? null,
        },
        token: { index: 2, isWritable: true, value: input.token ?? null },
        mint: { index: 3, isWritable: false, value: input.mint ?? null },
        metadata: { index: 4, isWritable: true, value: input.metadata ?? null },
        edition: { index: 5, isWritable: false, value: input.edition ?? null },
        tokenRecord: {
            index: 6,
            isWritable: true,
            value: input.tokenRecord ?? null,
        },
        payer: { index: 7, isWritable: true, value: input.payer ?? null },
        systemProgram: {
            index: 8,
            isWritable: false,
            value: input.systemProgram ?? null,
        },
        sysvarInstructions: {
            index: 9,
            isWritable: false,
            value: input.sysvarInstructions ?? null,
        },
        splTokenProgram: {
            index: 10,
            isWritable: false,
            value: input.splTokenProgram ?? null,
        },
        authorizationRulesProgram: {
            index: 11,
            isWritable: false,
            value: input.authorizationRulesProgram ?? null,
        },
        authorizationRules: {
            index: 12,
            isWritable: false,
            value: input.authorizationRules ?? null,
        },
    };

    // Arguments.
    const resolvedArgs: UnlockV1InstructionArgs = { ...input };

    // Default values.
    if (!resolvedAccounts.authority.value) {
        resolvedAccounts.authority.value = context.identity;
    }
    if (!resolvedAccounts.tokenOwner.value) {
        resolvedAccounts.tokenOwner = {
            ...resolvedAccounts.tokenOwner,
            ...resolveOptionalTokenOwner(
                context,
                resolvedAccounts,
                resolvedArgs,
                programId,
                false
            ),
        };
    }
    if (!resolvedAccounts.token.value) {
        resolvedAccounts.token.value = findAssociatedTokenPda(context, {
            mint: expectPublicKey(resolvedAccounts.mint.value),
            owner: expectPublicKey(resolvedAccounts.tokenOwner.value),
        });
    }
    if (!resolvedAccounts.metadata.value) {
        resolvedAccounts.metadata.value = findMetadataPda(context, {
            mint: expectPublicKey(resolvedAccounts.mint.value),
        });
    }
    if (!resolvedAccounts.edition.value) {
        if (
            resolveIsNonFungible(
                context,
                resolvedAccounts,
                resolvedArgs,
                programId,
                false
            )
        ) {
            resolvedAccounts.edition.value = findMasterEditionPda(context, {
                mint: expectPublicKey(resolvedAccounts.mint.value),
            });
        }
    }
    if (!resolvedAccounts.tokenRecord.value) {
        if (
            resolvedArgs.tokenStandard === TokenStandard.ProgrammableNonFungible
        ) {
            resolvedAccounts.tokenRecord.value = findTokenRecordPda(context, {
                mint: expectPublicKey(resolvedAccounts.mint.value),
                token: expectPublicKey(resolvedAccounts.token.value),
            });
        }
    }
    if (!resolvedAccounts.payer.value) {
        resolvedAccounts.payer.value = context.payer;
    }
    if (!resolvedAccounts.systemProgram.value) {
        resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
            'splSystem',
            '11111111111111111111111111111111'
        );
        resolvedAccounts.systemProgram.isWritable = false;
    }
    if (!resolvedAccounts.sysvarInstructions.value) {
        resolvedAccounts.sysvarInstructions.value = publicKey(
            'Sysvar1nstructions1111111111111111111111111'
        );
    }
    if (!resolvedAccounts.splTokenProgram.value) {
        if (
            resolvedArgs.tokenStandard !== TokenStandard.ProgrammableNonFungible
        ) {
            resolvedAccounts.splTokenProgram.value =
                context.programs.getPublicKey(
                    'splToken',
                    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
                );
            resolvedAccounts.splTokenProgram.isWritable = false;
        }
    }
    if (!resolvedAccounts.authorizationRulesProgram.value) {
        if (resolvedAccounts.authorizationRules.value) {
            resolvedAccounts.authorizationRulesProgram.value =
                context.programs.getPublicKey(
                    'mplTokenAuthRules',
                    'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'
                );
            resolvedAccounts.authorizationRulesProgram.isWritable = false;
        }
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
    const data = getUnlockV1InstructionDataSerializer().serialize(
        resolvedArgs as UnlockV1InstructionDataArgs
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
