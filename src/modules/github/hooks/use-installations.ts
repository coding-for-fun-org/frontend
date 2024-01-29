import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useToast } from '@/elements/root/toast/toast-provider'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import type { TGithubInstallation } from '@/types/github/root/index'

export const useInstallations = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { translate } = useDictionary()
  const { pushToast } = useToast()
  const { data: installations, isLoading } = useQuery(
    queryKey.github.installations(),
    ({ signal }) =>
      githubService
        .listUserInstallations({ signal })
        .then(({ installations }) =>
          installations.map((installation) => ({
            id: installation.id,
            // @ts-expect-error - It seems like login is not valid for enterprise level but I don't care about it
            owner: (installation.account?.login ?? '') as string,
            pageUrl: installation.account?.html_url ?? '',
            avatarUrl: installation.account?.avatar_url ?? ''
          }))
        ),
    {
      retry: 3,
      onError: () => {
        router.replace('/404')
      }
    }
  )
  const addMutation = useMutation({
    mutationFn: (installationId: number) => {
      return githubService.getInstallation(installationId)
    },
    onSuccess: (installation) => {
      queryClient.setQueryData<TGithubInstallation[] | undefined>(
        queryKey.github.installations(),
        (installations) => {
          if (!installations) {
            return undefined
          }

          return installations.toSpliced(0, 0, {
            id: installation.id,
            // @ts-expect-error - It seems like login is not valid for enterprise level but I don't care about it
            owner: (installation.account?.login ?? '') as string,
            pageUrl: installation.account?.html_url ?? '',
            avatarUrl: installation.account?.avatar_url ?? ''
          })
        }
      )
      pushToast({
        title: translate('COMMON.TOAST_DEFAULT_SUCCESS_TITLE'),
        description: translate(
          'GITHUB.TOAST_ADD_CONNECTION_SUCCESS_DESCRIPTION'
        ),
        variant: 'success'
      })
    }
  })
  const deleteMutation = useMutation({
    mutationFn: (installationId: number) => {
      return githubService.deleteInstallation(installationId)
    },
    onSuccess: (_, installationId) => {
      queryClient.setQueryData<TGithubInstallation[] | undefined>(
        queryKey.github.installations(),
        (installations) => {
          if (!installations) {
            return undefined
          }
          return installations.filter(
            (installation) => installation.id !== installationId
          )
        }
      )
      pushToast({
        title: translate('COMMON.TOAST_DEFAULT_SUCCESS_TITLE'),
        description: translate(
          'GITHUB.TOAST_DELETE_CONNECTION_SUCCESS_DESCRIPTION'
        ),
        variant: 'success'
      })
    }
  })

  return {
    isLoading,
    installations,
    addInstallation: addMutation.mutate,
    deleteInstallation: deleteMutation.mutate
  }
}
