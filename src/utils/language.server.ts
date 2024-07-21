'use server'

import { cookies } from 'next/headers'

import { ECookieKey, EIsoLanguageCode } from '@/types/root/index'

/**
 * @description
 * Get the language of the user from the cookie.
 * If the cookie is not set or invalid, return the default language.
 */
export async function getLanguage(): Promise<EIsoLanguageCode> {
  const cookieStore = cookies()
  const lang = cookieStore.get(ECookieKey.ISO_LANGUAGE_CODE)?.value

  if (
    // @ts-expect-error - We know that lang is a string
    !Object.values(EIsoLanguageCode).includes(lang)
  ) {
    return EIsoLanguageCode.ENGLISH
  }

  return lang as unknown as EIsoLanguageCode
}

/**
 * @description
 * Set language of the user in the cookie.
 * Then reload the page to apply the new language.
 */
export async function setLanguage(lang: EIsoLanguageCode): Promise<void> {
  const cookieStore = cookies()

  cookieStore.set(ECookieKey.ISO_LANGUAGE_CODE, lang, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    httpOnly: false,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })
}
