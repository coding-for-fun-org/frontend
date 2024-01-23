import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import { ECookieKey } from '@/types/root/index'
import type { TErrorResponse } from '@/types/root/server'

import {
  EProviders,
  type TRefreshTokenResponse
} from '@/types/github/root/server'

import { refreshToken as refreshGithubToken } from './github'

export async function GET(
  _: NextRequest,
  { params }: { params: { provider: EProviders } }
): Promise<TErrorResponse | NextResponse<TRefreshTokenResponse>> {
  const { provider } = params
  const oneDay = 24 * 60 * 60 * 1000
  const setCookie = cookies().set
  const deleteCookie = cookies().delete
  const expires = Date.now() + oneDay

  try {
    let accessToken: string | null = null
    let refreshToken: string | null = null

    switch (provider) {
      case EProviders.GITHUB: {
        const token = await refreshGithubToken()

        if (token) {
          accessToken = token.accessToken
          refreshToken = token.refreshToken
        }

        break
      }
    }

    if (!accessToken || !refreshToken) {
      deleteCookie(ECookieKey.AUTH_GITHUB_REFRESH_TOKEN)
      deleteCookie(ECookieKey.AUTH_PROVIDER)

      throw createHttpError(400)
    }

    setCookie(ECookieKey.AUTH_GITHUB_REFRESH_TOKEN, refreshToken, {
      expires,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    })
    setCookie(ECookieKey.AUTH_PROVIDER, provider, {
      expires,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    })

    return NextResponse.json({ accessToken: accessToken }, { status: 200 })
  } catch (error) {
    deleteCookie(ECookieKey.AUTH_GITHUB_REFRESH_TOKEN)
    deleteCookie(ECookieKey.AUTH_PROVIDER)

    return handleHttpErrorResponse(error)
  }
}
