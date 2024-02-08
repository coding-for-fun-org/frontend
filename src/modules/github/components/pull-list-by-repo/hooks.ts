import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import { useUpdateRepoOrPull } from '@/contexts/github/root/selected-pulls-provider'

export const useFetchPulls = (
  owner: string,
  repo: string,
  isRepoOpen: boolean
) => {
  const { setPulls } = useUpdateRepoOrPull()
  const {
    isPending,
    isLoading,
    data: pulls
  } = useQuery({
    queryKey: queryKey.github.repositoryPullRequests(owner, repo),
    queryFn: ({ signal }) =>
      githubService.listPullRequests(owner, repo, { signal }),
    enabled: isRepoOpen
  })

  useEffect(() => {
    setPulls(owner, repo, pulls)
  }, [pulls])

  return {
    isPending,
    isLoading
  }
}
