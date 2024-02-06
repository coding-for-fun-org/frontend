import { useQuery } from '@tanstack/react-query'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import type { UserInstallationsResponse } from '@/types/github/root/server'

export const useGetInstallations = <T>(
  selectCB: (response: UserInstallationsResponse) => T
) => {
  const query = useQuery<UserInstallationsResponse, unknown, T>({
    queryKey: queryKey.github.installations(),
    queryFn: ({ signal }) => githubService.listUserInstallations({ signal }),
    select: (response) => selectCB(response),
    retry: 3
  })

  return {
    ...query
  }
}
