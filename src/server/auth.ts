import { cookies } from 'next/headers'

import { createHash } from '@/utils/root/index'

import { ECookieKey } from '@/types/root/index'

export const validateCsrfToken = async (
  csrfToken: string
): Promise<{ isValid: boolean; hash: string | undefined }> => {
  try {
    const csrfCookie = cookies().get(ECookieKey.AUTH_CSRF_TOKEN)

    if (!csrfCookie) {
      return { isValid: false, hash: undefined }
    }

    const [cookieCsrfToken, cookieCsrfTokenHash] = csrfCookie.value.split('|')
    const expectedCookieCsrfTokenHash = await createHash(
      `${cookieCsrfToken}${process.env.AUTH_SECRET}`
    )

    if (cookieCsrfTokenHash !== expectedCookieCsrfTokenHash) {
      return { isValid: false, hash: undefined }
    }

    if (cookieCsrfToken !== csrfToken) {
      return { isValid: false, hash: undefined }
    }

    return { isValid: true, hash: cookieCsrfTokenHash }
  } catch (_) {
    return { isValid: false, hash: undefined }
  }
}
