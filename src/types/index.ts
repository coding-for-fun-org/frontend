export type PromiseReturnType<T> = T extends Promise<infer U> ? U : T
export type PickRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

const USER_STORE_PREFIX = '__cff-'

export enum EAuthErrorReason {
  REFRESH_TOKEN_EXPIRED = 'refresh_token_expired'
}

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
