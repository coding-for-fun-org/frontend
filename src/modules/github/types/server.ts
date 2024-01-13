import type { Endpoints } from '@octokit/types'

export enum EProviders {
  CREDENTIALS = 'credentials',
  GITHUB = 'github'
}

export type TSignInResponse = { url: string }

export type TSignOutResponse = { status: boolean }

export type TCsrfTokenResponse = { csrfToken: string }

export type TAccessTokenResponse = { accessToken: string }

export type TRefreshTokenResponse = { accessToken: string }

export type UserResponse = Endpoints['GET /user']['response']['data']

export type UserInstallationsResponse =
  Endpoints['GET /user/installations']['response']['data']

export type InstallationResponse =
  Endpoints['GET /app/installations/{installation_id}']['response']['data']

export type InstallationDeleteResponse =
  Endpoints['DELETE /app/installations/{installation_id}']['response']['data']

export type InstallationRepositoriesResponse =
  Endpoints['GET /user/installations/{installation_id}/repositories']['response']['data']

export type RepoPullsResponse =
  Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data']

export type PullReviewResponse =
  Endpoints['POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['response']['data']
