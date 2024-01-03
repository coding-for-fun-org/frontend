import type { getDictionary } from '@/dictionaries/root/index'

export type PromiseReturnType<T> = T extends Promise<infer U> ? U : T

export enum ESessionStatus {
  AUTHENTICATED = 'authenticated',
  LOADING = 'loading',
  UNAUTHENTICATED = 'unauthenticated'
}

const USER_STORE_PREFIX = '__cff-'

export enum EIsoLanguageCode {
  ENGLISH = 'en'
  // KOREAN = 'ko',
  // SPANISH = 'es'
}

export enum ECookieKey {
  AUTH_CSRF_TOKEN = `${USER_STORE_PREFIX}-csrf-token`,
  AUTH_GITHUB_REFRESH_TOKEN = `${USER_STORE_PREFIX}-refresh-token`,
  AUTH_PROVIDER = `${USER_STORE_PREFIX}-provider`,
  ISO_LANGUAGE_CODE = `${USER_STORE_PREFIX}-iso-language-code`
}

export enum ELocalStorageKey {
  THEME = `${USER_STORE_PREFIX}-theme`,
  AUTH_GITHUB_ACCESS_TOKEN = `${USER_STORE_PREFIX}-access-token`
}

export enum ETheme {
  LIGHT = 'light',
  DARK = 'dark'
}

export type TDictionary = PromiseReturnType<ReturnType<typeof getDictionary>>
