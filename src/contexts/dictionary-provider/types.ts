import type { getDictionary } from '@/dictionaries/root/index'

import type { PromiseReturnType } from '@/types/root/index'

export type TDictionary = PromiseReturnType<ReturnType<typeof getDictionary>>

export type TGeneralizedDictionary = {
  [key: string]: string | TGeneralizedDictionary
}

type TFlattenKeys<T extends TGeneralizedDictionary, Prefix extends string> = {
  [K in keyof T]: T[K] extends TGeneralizedDictionary
    ? TFlattenKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`
}[keyof T]

export type TTranslateKeys = TFlattenKeys<TDictionary, ''>

type _TValueOfKey<
  T extends TGeneralizedDictionary,
  K extends string
> = K extends `${infer Section}.${infer Rest}`
  ? Section extends keyof T
    ? Rest extends string
      ? _TValueOfKey<T[Section] & TGeneralizedDictionary, Rest>
      : never
    : never
  : K extends keyof T
    ? T[K]
    : never

type TExtractKeys<
  T extends string,
  Keys extends string[] = []
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = T extends `${infer _}{{${infer Key}}}${infer Rest}`
  ? TExtractKeys<Rest, [...Keys, Key]>
  : Keys[number]

type TUnionToObject<T extends string> = {
  [Key in T]: unknown
}

export type TTranslateParams<Key extends TTranslateKeys> =
  TExtractKeys<_TValueOfKey<TDictionary, Key>> extends never
    ? never
    : TUnionToObject<TExtractKeys<_TValueOfKey<TDictionary, Key>>>
