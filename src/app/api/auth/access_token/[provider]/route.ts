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
  type TAccessTokenResponse
} from '@/types/github/root/server'

import { getAccessToken as getGithubAccessToken } from './github'

export async function GET(
  req: NextRequest,
  { params }: { params: { provider: EProviders } }
): Promise<TErrorResponse | NextResponse<TAccessTokenResponse>> {
  const { provider } = params
  const oneMonth = 24 * 60 * 60 * 1000 * 30
  const setCookie = cookies().set
  const expires = Date.now() + oneMonth

  try {
    let accessToken: string | null = null
    let refreshToken: string | null = null

    switch (params.provider) {
      case EProviders.GITHUB: {
        const token = await getGithubAccessToken(req.nextUrl.searchParams)

        if (token) {
          accessToken = token.accessToken
          refreshToken = token.refreshToken
        }

        break
      }
    }

    if (!accessToken || !refreshToken) {
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
    return handleHttpErrorResponse(error)
  }
}
