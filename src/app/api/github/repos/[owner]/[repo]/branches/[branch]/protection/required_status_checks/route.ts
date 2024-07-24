import type { RequestError } from '@octokit/types'
import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithInstallationId } from '@/server/root/github'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse } from '@/types/root/server'

import type { BranchRequiredStatusChecksResponse } from '@/types/github/root/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { owner: string; repo: string; branch: string } }
): Promise<TErrorResponse | NextResponse<BranchRequiredStatusChecksResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const { owner, repo, branch } = params
    const searchParams = req.nextUrl.searchParams
    const installationId = searchParams.get('installationId')

    if (!installationId) {
      throw createHttpError(400, 'installationId is required')
    }

    const octokit = getOctokitWithInstallationId(installationId)

    /**
     * @see https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#get-status-checks-protection
     */
    const pulls = await octokit
      .request(
        'GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks',
        { owner, repo, branch }
      )
      .then((response) => response.data)
      .catch((error: RequestError) => {
        throw createHttpError(error.status, error)
      })

    return NextResponse.json(pulls, { status: 200 })
  } catch (error) {
    return handleHttpErrorResponse(error)
  }
}
