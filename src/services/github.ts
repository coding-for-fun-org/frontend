import type { AxiosRequestConfig } from 'axios'

import { axiosGithub } from '@/utils/github/root/axios'

import type { EPullRequestType } from '@/types/github/root/index'
import type {
  BranchRequiredStatusChecksResponse,
  InstallationDeleteResponse,
  InstallationRepositoriesResponse,
  InstallationResponse,
  PullReviewResponse,
  RepoCheckRunsForRefResponse,
  RepoCommitsResponse,
  RepoPullsResponse,
  UserInstallationsResponse,
  UserResponse
} from '@/types/github/root/server'

export const githubService = {
  async getUser(config?: AxiosRequestConfig): Promise<UserResponse> {
    return axiosGithub
      .get<UserResponse>('/api/github/user', config)
      .then((response) => response.data)
  },
  async listUserInstallations(
    config?: AxiosRequestConfig
  ): Promise<UserInstallationsResponse> {
    return axiosGithub
      .get<UserInstallationsResponse>('/api/github/user/installations', config)
      .then((response) => response.data)
  },
  async getInstallation(
    installationId: number,
    config?: AxiosRequestConfig
  ): Promise<InstallationResponse> {
    return axiosGithub
      .get<InstallationResponse>(
        `/api/github/app/installations/${installationId}`,
        config
      )
      .then((response) => response.data)
  },
  async deleteInstallation(
    installationId: number,
    config?: AxiosRequestConfig
  ): Promise<InstallationDeleteResponse> {
    return axiosGithub
      .delete<InstallationDeleteResponse>(
        `/api/github/app/installations/${installationId}`,
        config
      )
      .then((response) => response.data)
  },
  async listUserInstallationRepositories(
    installationId: number,
    config?: AxiosRequestConfig
  ): Promise<InstallationRepositoriesResponse> {
    return axiosGithub
      .get<InstallationRepositoriesResponse>(
        `/api/github/user/installations/${installationId}/repositories`,
        config
      )
      .then((response) => response.data)
  },
  async listPullRequests(
    owner: string,
    repo: string,
    config?: AxiosRequestConfig
  ): Promise<RepoPullsResponse> {
    return axiosGithub
      .get<RepoPullsResponse>(
        `/api/github/repos/${owner}/${repo}/pulls`,
        config
      )
      .then((response) => response.data)
  },
  async reviewPullRequest(
    owner: string,
    repo: string,
    pullNumber: number,
    payload: {
      reviewType: EPullRequestType
      comment: string
    },
    config?: AxiosRequestConfig
  ) {
    return axiosGithub
      .post<PullReviewResponse>(
        `/api/github/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
        { event: payload.reviewType, body: payload.comment },
        config
      )
      .then((response) => response.data)
  },
  async listCommits(
    owner: string,
    repo: string,
    config?: Omit<AxiosRequestConfig, 'params'> & {
      params: { sha: string; page?: number; perPage?: number }
    }
  ) {
    return axiosGithub
      .get<RepoCommitsResponse>(
        `/api/github/repos/${owner}/${repo}/commits`,
        config
      )
      .then((response) => response.data)
  },
  async listCheckRuns(
    owner: string,
    repo: string,
    ref: string,
    config?: Omit<AxiosRequestConfig, 'params'> & {
      params?: { page?: number; perPage?: number }
    }
  ) {
    return axiosGithub
      .get<RepoCheckRunsForRefResponse>(
        `/api/github/repos/${owner}/${repo}/commits/${ref}/check-runs`,
        config
      )
      .then((response) => response.data)
  },
  async listBranchRequiredStatusChecks(
    installationId: number,
    owner: string,
    repo: string,
    branch: string,
    config?: AxiosRequestConfig
  ) {
    return axiosGithub
      .get<BranchRequiredStatusChecksResponse>(
        `/api/github/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks`,
        { ...config, params: { installationId } }
      )
      .then((response) => response.data)
  }
}
