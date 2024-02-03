import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import type { UserInstallationsResponse } from '@/types/github/root/server'

export const useGetInstallations = <T>(
  selectCB: (response: UserInstallationsResponse) => T
) => {
  const router = useRouter()
  const query = useQuery<UserInstallationsResponse, unknown, T>({
    queryKey: queryKey.github.installations(),
    queryFn: ({ signal }) =>
      githubService.listUserInstallations({ signal }).catch((error) => {
        router.replace('/404')

        return Promise.reject(error)
      }),
    select: (response) => selectCB(response),
    retry: 3
  })

  return {
    ...query
  }
}
