import type { RequestError } from '@octokit/types'
import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithAccessToken } from '@/server/root/github'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse } from '@/types/root/server'

import type { RepoPullsResponse } from '@/types/github/root/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { owner: string; repo: string } }
): Promise<TErrorResponse | NextResponse<RepoPullsResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const { owner, repo } = params
    const searchParams = req.nextUrl.searchParams
    const page = searchParams.get('page')
    const perPage = searchParams.get('per_page')
    const octokit = getOctokitWithAccessToken(accessToken)

    /**
     * @see https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests
     */
    const pulls = await octokit
      .request('GET /repos/{owner}/{repo}/pulls', {
        owner,
        repo,
        ...(page && { page: Number(page) }),
        ...(perPage && { per_page: Number(perPage) })
      })
      .then((response) => response.data)
      .catch((error: RequestError) => {
        throw createHttpError(error?.status)
      })

    return NextResponse.json(pulls, { status: 200 })
  } catch (error) {
    return handleHttpErrorResponse(error)
  }
}
