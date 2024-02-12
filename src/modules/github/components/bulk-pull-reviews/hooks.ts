import { type UseQueryOptions, useQueries } from '@tanstack/react-query'
import { useEffect } from 'react'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import { useUpdateRepoOrPull } from '@/contexts/github/root/selected-pulls-provider'

import { useGetInstallations } from '@/queries/github/root/use-installations'

import type { InstallationRepositoriesResponse } from '@/types/github/root/server'

export const useFetchRepositories = () => {
  const { setRepos } = useUpdateRepoOrPull()
  const { data: installationIds, isLoading: isInstallationsLoading } =
    useGetInstallations<number[]>(({ installations }) =>
      installations.map((installation) => installation.id)
    )
  const {
    data: repos,
    isLoading: isRepositoriesLoading,
    isPending: isRepositoriesPending
  } = useQueries<
    UseQueryOptions<
      InstallationRepositoriesResponse,
      unknown,
      {
        installationId: number
        repos: InstallationRepositoriesResponse['repositories']
      }
    >[],
    {
      data:
        | {
            installationId: number
            repos: InstallationRepositoriesResponse['repositories']
          }[]
        | undefined
      isLoading: boolean
      isPending: boolean
    }
  >({
    queries: !!installationIds
      ? installationIds.map((installationId) => ({
          queryKey: queryKey.github.installationRepositories(installationId),
          queryFn: ({ signal }) =>
            githubService.listUserInstallationRepositories(installationId, {
              signal
            }),
          select: ({ repositories }) => ({
            installationId,
            repos: repositories
          }),
          enabled: !!installationId
        }))
      : [],
    combine: (responses) => {
      const isLoading =
        isInstallationsLoading ||
        responses.some((response) => response.isLoading)
      const isPending =
        isInstallationsLoading ||
        responses.some((response) => response.isPending)

      return {
        data:
          !isLoading && !isPending
            ? responses.map((response) => response.data!)
            : undefined,
        isLoading,
        isPending
      }
    }
  })

  useEffect(() => {
    setRepos(repos)
  }, [repos])

  return {
    isLoading: isRepositoriesLoading || isRepositoriesPending
  }
}
