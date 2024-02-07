import {
  type UseQueryOptions,
  type UseQueryResult,
  useQueries
} from '@tanstack/react-query'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import type {
  InstallationRepositoriesResponse,
  RepoPullsResponse
} from '@/types/github/root/server'

export const useGetInstallationsRepositories = <T, R>(
  installationIds: number[] | undefined,
  selectCB: (response: InstallationRepositoriesResponse) => T,
  combineCB: (
    response: UseQueryResult<
      InstallationRepositoriesResponse extends T
        ? InstallationRepositoriesResponse
        : T
    >[]
  ) => R
) => {
  const query = useQueries<
    UseQueryOptions<InstallationRepositoriesResponse, unknown, T>[],
    R
  >({
    queries: !!installationIds
      ? installationIds.map((installationId) => ({
          queryKey: queryKey.github.installationRepositories(installationId),
          queryFn: ({ signal }) =>
            githubService.listUserInstallationRepositories(installationId, {
              signal
            }),
          select: (response) => selectCB(response),
          retry: 3,
          enabled: !!installationId
        }))
      : [],
    combine: (response) => combineCB(response)
  })

  return {
    ...query
  }
}

export const useGetRepositoryPullRequests = <T, R>(
  repositories:
    | (InstallationRepositoriesResponse['repositories'][number] | undefined)[]
    | undefined,
  selectCB: (
    response: RepoPullsResponse,
    repository: InstallationRepositoriesResponse['repositories'][number]
  ) => T,
  combineCB: (
    response: UseQueryResult<
      RepoPullsResponse extends T ? RepoPullsResponse : T
    >[]
  ) => R
) => {
  const query = useQueries<UseQueryOptions<RepoPullsResponse, unknown, T>[], R>(
    {
      queries: !!repositories
        ? repositories.map((repository) => ({
            queryKey: queryKey.github.repositoryPullRequests(
              repository?.owner.login ?? '',
              repository?.name ?? ''
            ),
            queryFn: ({ signal }) =>
              githubService.listPullRequests(
                repository?.owner.login ?? '',
                repository?.name ?? '',
                { signal }
              ),
            select: (response) => selectCB(response, repository!),
            retry: 3,
            enabled: !!repository
          }))
        : [],
      combine: (response) => combineCB(response)
    }
  )

  return {
    ...query
  }
}
