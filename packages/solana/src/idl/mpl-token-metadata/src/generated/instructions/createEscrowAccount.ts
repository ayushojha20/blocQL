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
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findMasterEditionPda, findMetadataPda } from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type CreateEscrowAccountInstructionAccounts = {
  /** Escrow account */
  escrow: PublicKey | Pda;
  /** Metadata account */
  metadata?: PublicKey | Pda;
  /** Mint account */
  mint: PublicKey | Pda;
  /** Token account of the token */
  tokenAccount: PublicKey | Pda;
  /** Edition account */
  edition?: PublicKey | Pda;
  /** Wallet paying for the transaction and new account */
  payer?: Signer;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey | Pda;
  /** Authority/creator of the escrow account */
  authority?: Signer;
};

// Data.
export type CreateEscrowAccountInstructionData = { discriminator: number };

export type CreateEscrowAccountInstructionDataArgs = {};

export function getCreateEscrowAccountInstructionDataSerializer(): Serializer<
  CreateEscrowAccountInstructionDataArgs,
  CreateEscrowAccountInstructionData
> {
  return mapSerializer<
    CreateEscrowAccountInstructionDataArgs,
    any,
    CreateEscrowAccountInstructionData
  >(
    struct<CreateEscrowAccountInstructionData>([['discriminator', u8()]], {
      description: 'CreateEscrowAccountInstructionData',
    }),
    (value) => ({ ...value, discriminator: 38 })
  ) as Serializer<
    CreateEscrowAccountInstructionDataArgs,
    CreateEscrowAccountInstructionData
  >;
}

// Instruction.
export function createEscrowAccount(
  context: Pick<Context, 'eddsa' | 'payer' | 'programs'>,
  input: CreateEscrowAccountInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    escrow: { index: 0, isWritable: true, value: input.escrow ?? null },
    metadata: { index: 1, isWritable: true, value: input.metadata ?? null },
    mint: { index: 2, isWritable: false, value: input.mint ?? null },
    tokenAccount: {
      index: 3,
      isWritable: false,
      value: input.tokenAccount ?? null,
    },
    edition: { index: 4, isWritable: false, value: input.edition ?? null },
    payer: { index: 5, isWritable: true, value: input.payer ?? null },
    systemProgram: {
      index: 6,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 7,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
    authority: { index: 8, isWritable: false, value: input.authority ?? null },
  };

  // Default values.
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.edition.value) {
    resolvedAccounts.edition.value = findMasterEditionPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
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
  const data = getCreateEscrowAccountInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
