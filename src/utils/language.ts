import Cookies from 'universal-cookie'

import { ECookieKey, EIsoLanguageCode } from '@/types/root/index'

/**
 * @description
 * Get the language of the user from the cookie.
 * If the cookie is not set or invalid, return the default language.
 */

const cookies = new Cookies()

export const getLanguage = (): EIsoLanguageCode => {
  const lang = cookies.get(ECookieKey.ISO_LANGUAGE_CODE) as EIsoLanguageCode
  //
  if (
    // @ts-expect-error - We know that lang is a string
    !Object.values(EIsoLanguageCode).includes(lang)
  ) {
    return EIsoLanguageCode.ENGLISH
  }
  //
  return lang
}

/**
 * @description
 * Set language of the user in the cookie.
 * Then reload the page to apply the new language.
 */
export const setLanguage = (lang: EIsoLanguageCode): void => {
  cookies.set(ECookieKey.ISO_LANGUAGE_CODE, lang, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    httpOnly: false,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

  location.reload()
}
