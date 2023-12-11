import type { Endpoints } from '@octokit/types'

export type UserInstallationsResponse =
  Endpoints['GET /user/installations']['response']['data']

export type InstallationRepositoriesResponse =
  Endpoints['GET /user/installations/{installation_id}/repositories']['response']['data']

export type RepoPullsResponse =
  Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data']

export type PullReviewResponse =
  Endpoints['POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews']['response']['data']
