import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/elements/root/toast/toast-provider'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import type { UserInstallationsResponse } from '@/types/github/root/server'

export const useAddInstallation = () => {
  const queryClient = useQueryClient()
  const { translate } = useDictionary()
  const { pushToast } = useToast()
  const mutation = useMutation({
    mutationFn: (installationId: number) =>
      githubService.getInstallation(installationId),
    onSuccess: (installation) => {
      queryClient.setQueryData<UserInstallationsResponse | undefined>(
        queryKey.github.installations(),
        (response) => {
          if (!response) {
            return undefined
          }

          return {
            ...response,
            total_count: response.total_count + 1,
            installations: response.installations.toSpliced(0, 0, installation)
          }
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

  return {
    ...mutation
  }
}

export const useDeleteInstallation = () => {
  const queryClient = useQueryClient()
  const { translate } = useDictionary()
  const { pushToast } = useToast()
  const mutation = useMutation({
    mutationFn: (installationId: number) =>
      githubService.deleteInstallation(installationId),
    onSuccess: (_, installationId) => {
      queryClient.setQueryData<UserInstallationsResponse | undefined>(
        queryKey.github.installations(),
        (response) => {
          if (!response) {
            return undefined
          }

          return {
            ...response,
            total_count: response.total_count - 1,
            installations: response.installations.filter(
              (installation) => installation.id !== installationId
            )
          }
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
    ...mutation
  }
}
