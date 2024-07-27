import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithAccessToken } from '@/server/root/github'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse, TOctokitRequestError } from '@/types/root/server'

import type { InstallationRepositoriesResponse } from '@/types/github/root/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { installationId: string } }
): Promise<TErrorResponse | NextResponse<InstallationRepositoriesResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const { installationId } = params
    const searchParams = req.nextUrl.searchParams
    const page = searchParams.get('page')
    const perPage = searchParams.get('perPage')
    const octokit = getOctokitWithAccessToken(accessToken)

    /**
     * @see https://docs.github.com/en/rest/apps/installations?apiVersion=2022-11-28#list-repositories-accessible-to-the-user-access-token
     */
    const repos = await octokit
      .request('GET /user/installations/{installation_id}/repositories', {
        installation_id: Number(installationId),
        ...(page && { page: Number(page) }),
        ...(perPage && { per_page: Number(perPage) })
      })
      .then((response) => response.data)
      .catch((error: TOctokitRequestError) => {
        throw createHttpError(undefined, error)
      })

    return NextResponse.json(repos, { status: 200 })
  } catch (error) {
    console.error('error', error)
    return handleHttpErrorResponse(error)
  }
}
