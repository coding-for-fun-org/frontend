import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithAccessToken } from '@/server/root/github'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse, TOctokitRequestError } from '@/types/root/server'

import type { UserResponse } from '@/types/github/root/server'

export async function GET(
  req: NextRequest
): Promise<TErrorResponse | NextResponse<UserResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const octokit = getOctokitWithAccessToken(accessToken)

    /**
     * @see https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
     */
    const user = await octokit
      .request('GET /user')
      .then((response) => response.data)
      .catch((error: TOctokitRequestError) => {
        throw createHttpError(undefined, error)
      })

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error('error', error)
    return handleHttpErrorResponse(error)
  }
}
