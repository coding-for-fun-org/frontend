import type { RequestError } from '@octokit/types'
import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithAccessToken } from '@/server/root/github'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse } from '@/types/root/server'

import { EPullRequestType } from '@/types/github/root/index'
import type { PullReviewResponse } from '@/types/github/root/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { owner: string; repo: string; pullNumber: string } }
): Promise<TErrorResponse | NextResponse<PullReviewResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const { owner, repo, pullNumber } = params
    const octokit = getOctokitWithAccessToken(accessToken)
    const { body, event } = (await req.json()) as {
      body?: string
      event?: EPullRequestType
    }

    if (
      (event === EPullRequestType.COMMENT ||
        event === EPullRequestType.REQUEST_CHANGES) &&
      !body
    ) {
      throw createHttpError(
        400,
        'body is required when using REQUEST_CHANGES or COMMENT for the event'
      )
    }

    /**
     * @see https://docs.github.com/en/rest/pulls/reviews?apiVersion=2022-11-28#create-a-review-for-a-pull-request
     */
    const review = await octokit
      .request('POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
        owner,
        repo,
        pull_number: +pullNumber,
        body,
        event
      })
      .then((response) => response.data)
      .catch((error: RequestError) => {
        console.error('error', error)
        throw createHttpError(error?.status)
      })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('error', error)
    return handleHttpErrorResponse(error)
  }
}
