import type { RequestError } from '@octokit/types'
import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithAccessToken } from '@/server/root/github'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse } from '@/types/root/server'

import type { RepoCheckRunsForRefResponse } from '@/types/github/root/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { owner: string; repo: string; ref: string } }
): Promise<TErrorResponse | NextResponse<RepoCheckRunsForRefResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const { owner, repo, ref } = params
    const searchParams = req.nextUrl.searchParams
    const page = searchParams.get('page')
    const perPage = searchParams.get('perPage')
    const octokit = getOctokitWithAccessToken(accessToken)

    /**
     * @see https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits
     */
    const pulls = await octokit
      .request('GET /repos/{owner}/{repo}/commits/{ref}/check-runs', {
        owner,
        repo,
        ref,
        ...(page && { page: Number(page) }),
        ...(perPage && { per_page: Number(perPage) })
      })
      .then((response) => response.data)
      .catch((error: RequestError) => {
        console.error('error', error)
        throw createHttpError(error?.status)
      })

    return NextResponse.json(pulls, { status: 200 })
  } catch (error) {
    console.error('error', error)
    return handleHttpErrorResponse(error)
  }
}
