import type { RequestError } from '@octokit/types'
import { type NextRequest, NextResponse } from 'next/server'

import { getOctokitWithInstallationId } from '@/server/root/github'

import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

import type { TErrorResponse } from '@/types/root/server'

import type {
  InstallationDeleteResponse,
  InstallationResponse
} from '@/types/github/root/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { installationId: string } }
): Promise<TErrorResponse | NextResponse<InstallationResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const { installationId } = params
    const octokit = getOctokitWithInstallationId(installationId)

    /**
     * @see https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#get-an-installation-for-the-authenticated-app
     */
    const installation = await octokit
      .request('GET /app/installations/{installation_id}', {
        installation_id: Number(installationId)
      })
      .then((response) => response.data)
      .catch((error: RequestError) => {
        console.error('error', error)
        throw createHttpError(error?.status)
      })

    return NextResponse.json(installation, { status: 200 })
  } catch (error) {
    console.error('error', error)
    return handleHttpErrorResponse(error)
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { installationId: string } }
): Promise<TErrorResponse | NextResponse<InstallationDeleteResponse>> {
  try {
    const accessToken = req.headers.get('authorization')

    if (!accessToken) {
      throw createHttpError(401)
    }

    const { installationId } = params
    const octokit = getOctokitWithInstallationId(installationId)

    /**
     * @see https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#delete-an-installation-for-the-authenticated-app
     */
    await octokit
      .request('DELETE /app/installations/{installation_id}', {
        installation_id: Number(installationId)
      })
      .catch((error: RequestError) => {
        console.error('error', error)
        throw createHttpError(error?.status)
      })

    return new NextResponse(undefined, { status: 204 })
  } catch (error) {
    console.error('error', error)
    return handleHttpErrorResponse(error)
  }
}
