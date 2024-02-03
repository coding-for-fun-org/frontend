import type { RequestError } from '@octokit/types'
import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithAccessToken } from '@/server/root/github'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse } from '@/types/root/server'

import type { UserInstallationsResponse } from '@/types/github/root/server'

export async function GET(
  req: NextRequest
): Promise<TErrorResponse | NextResponse<UserInstallationsResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const searchParams = req.nextUrl.searchParams
    const page = searchParams.get('page')
    const perPage = searchParams.get('per_page')
    const octokit = getOctokitWithAccessToken(accessToken)

    /**
     * @see https://docs.github.com/en/rest/apps/installations?apiVersion=2022-11-28#list-app-installations-accessible-to-the-user-access-token
     */
    const installations = await octokit
      .request('GET /user/installations', {
        ...(page && { page: Number(page) }),
        ...(perPage && { per_page: Number(perPage) })
      })
      .then((response) => response.data)
      .catch((error: RequestError) => {
        throw createHttpError(error?.status)
      })

    return NextResponse.json(installations, { status: 200 })
  } catch (error) {
    console.error('error', error)
    return handleHttpErrorResponse(error)
  }
}
