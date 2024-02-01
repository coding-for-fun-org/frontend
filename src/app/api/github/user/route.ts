import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithAccessToken } from '@/server/root/github'

import type { TErrorResponse } from '@/types/root/server'

import type { UserResponse } from '@/types/github/root/server'

export async function GET(
  req: NextRequest
): Promise<TErrorResponse | NextResponse<UserResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      return NextResponse.json(
        { error: { message: 'Unauthorized' } },
        { status: 401 }
      )
    }

    const octokit = getOctokitWithAccessToken(accessToken)

    /**
     * @see https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
     */
    const user = await octokit
      .request('GET /user')
      .then((response) => response.data)

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error('error', error)
    return NextResponse.json(
      { error: { message: 'Internal Server Error' } },
      { status: 500 }
    )
  }
}
