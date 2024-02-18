import type { RequestError } from '@octokit/types'
import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithAccessToken } from '@/server/root/github'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse } from '@/types/root/server'

import type { RepoCommitsResponse } from '@/types/github/root/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { owner: string; repo: string } }
): Promise<TErrorResponse | NextResponse<RepoCommitsResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const { owner, repo } = params
    const searchParams = req.nextUrl.searchParams
    const sha = searchParams.get('sha')
    const page = searchParams.get('page')
    const perPage = searchParams.get('perPage')
    const octokit = getOctokitWithAccessToken(accessToken)

    // sha is not actually requried,
    // but there's no point in making the request without it in this app
    if (!sha) {
      throw createHttpError(400, 'sha is required')
    }

    /**
     * @see https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits
     */
    const pulls = await octokit
      .request('GET /repos/{owner}/{repo}/commits', {
        owner,
        repo,
        sha,
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
