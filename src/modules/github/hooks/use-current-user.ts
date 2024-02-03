import { useQuery } from '@tanstack/react-query'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import type { UserResponse } from '@/types/github/root/server'

const fetchUser = async (signal: AbortSignal | undefined) => {
  return githubService.getUser({ signal })
}

export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    isError
  } = useQuery<UserResponse>({
    queryKey: queryKey.github.currentUser(),
    queryFn: async ({ signal }) => fetchUser(signal)
  })

  return { user, isLoading, isError }
}
