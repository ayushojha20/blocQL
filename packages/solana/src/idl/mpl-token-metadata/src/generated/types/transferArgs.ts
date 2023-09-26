/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Option, OptionOrNullable, none } from '@metaplex-foundation/umi';
import {
    GetDataEnumKind,
    GetDataEnumKindContent,
    Serializer,
    dataEnum,
    mapSerializer,
    option,
    struct,
    u64,
} from '@metaplex-foundation/umi/serializers';
import {
    AuthorizationData,
    AuthorizationDataArgs,
    getAuthorizationDataSerializer,
} from '.';

export type TransferArgs = {
    __kind: 'V1';
    amount: bigint;
    authorizationData: Option<AuthorizationData>;
};

export type TransferArgsArgs = {
    __kind: 'V1';
    amount?: number | bigint;
    authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getTransferArgsSerializer(): Serializer<
    TransferArgsArgs,
    TransferArgs
> {
    return dataEnum<TransferArgs>(
        [
            [
                'V1',
                mapSerializer<
                    GetDataEnumKindContent<TransferArgsArgs, 'V1'>,
                    any,
                    GetDataEnumKindContent<TransferArgs, 'V1'>
                >(
                    struct<GetDataEnumKindContent<TransferArgs, 'V1'>>([
                        ['amount', u64()],
                        [
                            'authorizationData',
                            option(getAuthorizationDataSerializer()),
                        ],
                    ]),
                    (value) => ({
                        ...value,
                        amount: value.amount ?? 1,
                        authorizationData: value.authorizationData ?? none(),
                    })
                ),
            ],
        ],
        { description: 'TransferArgs' }
    ) as Serializer<TransferArgsArgs, TransferArgs>;
}

// Data Enum Helpers.
export function transferArgs(
    kind: 'V1',
    data: GetDataEnumKindContent<TransferArgsArgs, 'V1'>
): GetDataEnumKind<TransferArgsArgs, 'V1'>;
export function transferArgs<K extends TransferArgsArgs['__kind']>(
    kind: K,
    data?: any
): Extract<TransferArgsArgs, { __kind: K }> {
    return Array.isArray(data)
        ? { __kind: kind, fields: data }
        : { __kind: kind, ...(data ?? {}) };
}
export function isTransferArgs<K extends TransferArgs['__kind']>(
    kind: K,
    value: TransferArgs
): value is TransferArgs & { __kind: K } {
    return value.__kind === kind;
}
