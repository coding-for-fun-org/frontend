import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { handleHttpErrorResponse } from '@/utils/root/http-errors'
import { createHash, createRandomString } from '@/utils/root/index'

import { ECookieKey } from '@/types/root/index'
import type { TErrorResponse } from '@/types/root/server'

import type { TCsrfTokenResponse } from '@/types/github/root/server'

export async function GET(): Promise<
  TErrorResponse | NextResponse<TCsrfTokenResponse>
> {
  try {
    const csrfToken = createRandomString(32)
    const csrfTokenHash = await createHash(
      `${csrfToken}${process.env.AUTH_SECRET}`
    )
    const cookieValue = `${csrfToken}|${csrfTokenHash}`

    cookies().set(ECookieKey.AUTH_CSRF_TOKEN, cookieValue, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    return NextResponse.json({ csrfToken }, { status: 200 })
  } catch (error) {
    return handleHttpErrorResponse(error)
  }
}
