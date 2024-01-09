import { axiosGithub } from '@/utils/github/root/axios'

import type { EPullRequestType } from '@/types/github/root/index'
import type {
  InstallationRepositoriesResponse,
  PullReviewResponse,
  RepoPullsResponse,
  UserInstallationsResponse
} from '@/types/github/root/server'

export const githubService = {
  async listUserInstallations(): Promise<UserInstallationsResponse> {
    return axiosGithub
      .get<UserInstallationsResponse>('/api/github/user/installations')
      .then((response) => response.data)
  },
  async listUserInstallationRepositories(
    installationId: number
  ): Promise<InstallationRepositoriesResponse> {
    return axiosGithub
      .get<InstallationRepositoriesResponse>(
        `/api/github/user/installations/${installationId}/repositories`
      )
      .then((response) => response.data)
  },
  async listPullRequests(
    owner: string,
    repo: string
  ): Promise<RepoPullsResponse> {
    return axiosGithub
      .get<RepoPullsResponse>(`/api/github/repos/${owner}/${repo}/pulls`)
      .then((response) => response.data)
  },
  async reviewPullRequest(
    owner: string,
    repo: string,
    pullNumber: number,
    payload: {
      reviewType: EPullRequestType
      comment: string
    }
  ) {
    return axiosGithub
      .post<PullReviewResponse>(
        `/api/github/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
        { event: payload.reviewType, body: payload.comment }
      )
      .then((response) => response.data)
  }
}
