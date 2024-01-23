import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { validateCsrfToken } from '@/server/root/auth'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import { ECookieKey } from '@/types/root/index'
import type { TErrorResponse } from '@/types/root/server'

import type { TSignOutResponse } from '@/types/github/root/server'

export async function POST(
  req: NextRequest
): Promise<TErrorResponse | NextResponse<TSignOutResponse>> {
  try {
    const { csrf_token: csrfToken } = (await req.json()) as {
      csrf_token?: string
    }
    const deleteCookie = cookies().delete

    if (!csrfToken) {
      throw createHttpError(401, 'CSRF Token is required')
    }

    const { isValid: isValidCsrfToken } = await validateCsrfToken(csrfToken)

    if (!isValidCsrfToken) {
      throw createHttpError(401, 'Invalid CSRF Token')
    }

    deleteCookie(ECookieKey.AUTH_GITHUB_REFRESH_TOKEN)
    deleteCookie(ECookieKey.AUTH_CSRF_TOKEN)

    return NextResponse.json({ status: true }, { status: 200 })
  } catch (error) {
    return handleHttpErrorResponse(error)
  }
}
