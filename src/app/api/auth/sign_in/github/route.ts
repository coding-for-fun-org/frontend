import { type NextRequest, NextResponse } from 'next/server'

import { validateCsrfToken } from '@/server/root/auth'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse } from '@/types/root/server'

import type { TSignInResponse } from '@/types/github/root/server'

export async function POST(
  req: NextRequest
): Promise<TErrorResponse | NextResponse<TSignInResponse>> {
  try {
    const { csrf_token: csrfToken } = (await req.json()) as {
      csrf_token?: string
    }

    if (!csrfToken) {
      throw createHttpError(401, 'CSRF Token is required')
    }

    const { isValid: isValidCsrfToken, hash: csrfTokenHash } =
      await validateCsrfToken(csrfToken)

    if (!isValidCsrfToken) {
      throw createHttpError(401, 'Invalid CSRF Token')
    }

    const redirectUri = `${process.env.NEXT_PUBLIC_PAGE_URL}/callback/auth/github/authorize`

    return NextResponse.json(
      {
        url: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&redirect_uri=${redirectUri}&state=${csrfTokenHash}`
      },
      { status: 200 }
    )
  } catch (error) {
    return handleHttpErrorResponse(error)
  }
}
