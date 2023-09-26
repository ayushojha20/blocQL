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
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type UnverifySizedCollectionItemInstructionAccounts = {
  /** Metadata account */
  metadata: PublicKey | Pda;
  /** Collection Authority */
  collectionAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** Mint of the Collection */
  collectionMint: PublicKey | Pda;
  /** Metadata Account of the Collection */
  collection: PublicKey | Pda;
  /** MasterEdition2 Account of the Collection Token */
  collectionMasterEditionAccount: PublicKey | Pda;
  /** Collection Authority Record PDA */
  collectionAuthorityRecord?: PublicKey | Pda;
};

// Data.
export type UnverifySizedCollectionItemInstructionData = {
  discriminator: number;
};

export type UnverifySizedCollectionItemInstructionDataArgs = {};

export function getUnverifySizedCollectionItemInstructionDataSerializer(): Serializer<
  UnverifySizedCollectionItemInstructionDataArgs,
  UnverifySizedCollectionItemInstructionData
> {
  return mapSerializer<
    UnverifySizedCollectionItemInstructionDataArgs,
    any,
    UnverifySizedCollectionItemInstructionData
  >(
    struct<UnverifySizedCollectionItemInstructionData>(
      [['discriminator', u8()]],
      { description: 'UnverifySizedCollectionItemInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 31 })
  ) as Serializer<
    UnverifySizedCollectionItemInstructionDataArgs,
    UnverifySizedCollectionItemInstructionData
  >;
}

// Instruction.
export function unverifySizedCollectionItem(
  context: Pick<Context, 'payer' | 'programs'>,
  input: UnverifySizedCollectionItemInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    metadata: { index: 0, isWritable: true, value: input.metadata ?? null },
    collectionAuthority: {
      index: 1,
      isWritable: false,
      value: input.collectionAuthority ?? null,
    },
    payer: { index: 2, isWritable: true, value: input.payer ?? null },
    collectionMint: {
      index: 3,
      isWritable: false,
      value: input.collectionMint ?? null,
    },
    collection: { index: 4, isWritable: true, value: input.collection ?? null },
    collectionMasterEditionAccount: {
      index: 5,
      isWritable: false,
      value: input.collectionMasterEditionAccount ?? null,
    },
    collectionAuthorityRecord: {
      index: 6,
      isWritable: false,
      value: input.collectionAuthorityRecord ?? null,
    },
  };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'omitted',
    programId
  );

  // Data.
  const data =
    getUnverifySizedCollectionItemInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
