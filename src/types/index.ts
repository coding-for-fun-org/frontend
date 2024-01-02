import type { getDictionary } from '@/dictionaries/root/index'

export type PromiseReturnType<T> = T extends Promise<infer U> ? U : T

export enum ESessionStatus {
  AUTHENTICATED = 'authenticated',
  LOADING = 'loading',
  UNAUTHENTICATED = 'unauthenticated'
}

const USER_STORE_PREFIX = '__cff-'

export enum ECookieKey {
  AUTH_CSRF_TOKEN = `${USER_STORE_PREFIX}-csrf-token`,
  AUTH_REFRESH_TOKEN = `${USER_STORE_PREFIX}-refresh-token`,
  AUTH_PROVIDER = `${USER_STORE_PREFIX}-provider`
}

export enum ELocalStorageKey {
  THEME = `${USER_STORE_PREFIX}-theme`,
  AUTH_ACCESS_TOKEN = `${USER_STORE_PREFIX}-access-token`
}

export enum ETheme {
  LIGHT = 'light',
  DARK = 'dark'
}

export type TDictionary = PromiseReturnType<ReturnType<typeof getDictionary>>
