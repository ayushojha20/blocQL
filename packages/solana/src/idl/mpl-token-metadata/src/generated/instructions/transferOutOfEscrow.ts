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
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type TransferOutOfEscrowInstructionAccounts = {
  /** Escrow account */
  escrow: PublicKey | Pda;
  /** Metadata account */
  metadata: PublicKey | Pda;
  /** Wallet paying for the transaction and new account */
  payer?: Signer;
  /** Mint account for the new attribute */
  attributeMint: PublicKey | Pda;
  /** Token account source for the new attribute */
  attributeSrc: PublicKey | Pda;
  /** Token account, owned by TM, destination for the new attribute */
  attributeDst: PublicKey | Pda;
  /** Mint account that the escrow is attached */
  escrowMint: PublicKey | Pda;
  /** Token account that holds the token the escrow is attached to */
  escrowAccount: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Associated Token program */
  ataProgram?: PublicKey | Pda;
  /** Token program */
  tokenProgram?: PublicKey | Pda;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey | Pda;
  /** Authority/creator of the escrow account */
  authority?: Signer;
};

// Data.
export type TransferOutOfEscrowInstructionData = {
  discriminator: number;
  amount: bigint;
};

export type TransferOutOfEscrowInstructionDataArgs = {
  amount?: number | bigint;
};

export function getTransferOutOfEscrowInstructionDataSerializer(): Serializer<
  TransferOutOfEscrowInstructionDataArgs,
  TransferOutOfEscrowInstructionData
> {
  return mapSerializer<
    TransferOutOfEscrowInstructionDataArgs,
    any,
    TransferOutOfEscrowInstructionData
  >(
    struct<TransferOutOfEscrowInstructionData>(
      [
        ['discriminator', u8()],
        ['amount', u64()],
      ],
      { description: 'TransferOutOfEscrowInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 40, amount: value.amount ?? 1 })
  ) as Serializer<
    TransferOutOfEscrowInstructionDataArgs,
    TransferOutOfEscrowInstructionData
  >;
}

// Args.
export type TransferOutOfEscrowInstructionArgs =
  TransferOutOfEscrowInstructionDataArgs;

// Instruction.
export function transferOutOfEscrow(
  context: Pick<Context, 'payer' | 'programs'>,
  input: TransferOutOfEscrowInstructionAccounts &
    TransferOutOfEscrowInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    escrow: { index: 0, isWritable: false, value: input.escrow ?? null },
    metadata: { index: 1, isWritable: true, value: input.metadata ?? null },
    payer: { index: 2, isWritable: true, value: input.payer ?? null },
    attributeMint: {
      index: 3,
      isWritable: false,
      value: input.attributeMint ?? null,
    },
    attributeSrc: {
      index: 4,
      isWritable: true,
      value: input.attributeSrc ?? null,
    },
    attributeDst: {
      index: 5,
      isWritable: true,
      value: input.attributeDst ?? null,
    },
    escrowMint: {
      index: 6,
      isWritable: false,
      value: input.escrowMint ?? null,
    },
    escrowAccount: {
      index: 7,
      isWritable: false,
      value: input.escrowAccount ?? null,
    },
    systemProgram: {
      index: 8,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    ataProgram: {
      index: 9,
      isWritable: false,
      value: input.ataProgram ?? null,
    },
    tokenProgram: {
      index: 10,
      isWritable: false,
      value: input.tokenProgram ?? null,
    },
    sysvarInstructions: {
      index: 11,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
    authority: { index: 12, isWritable: false, value: input.authority ?? null },
  };

  // Arguments.
  const resolvedArgs: TransferOutOfEscrowInstructionArgs = { ...input };

  // Default values.
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
  if (!resolvedAccounts.ataProgram.value) {
    resolvedAccounts.ataProgram.value = context.programs.getPublicKey(
      'splAssociatedToken',
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
    );
    resolvedAccounts.ataProgram.isWritable = false;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
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
  const data = getTransferOutOfEscrowInstructionDataSerializer().serialize(
    resolvedArgs as TransferOutOfEscrowInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
