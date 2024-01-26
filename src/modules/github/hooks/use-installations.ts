import { useEffect, useState } from 'react'

import { useToast } from '@/elements/root/toast/toast-provider'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { githubService } from '@/services/root/github'

import type { TGithubInstallation } from '@/types/github/root/index'

export const useInstallations = () => {
  const { translate } = useDictionary()
  const { pushToast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [installations, setInstallations] = useState<TGithubInstallation[]>([])

  const addInstallation = (installationId: number) => {
    githubService
      .getInstallation(installationId)
      .then((installation) => {
        setInstallations((installations) =>
          installations.toSpliced(0, 0, {
            id: installation.id,
            // @ts-expect-error - It seems like login is not valid for enterprise level but I don't care about it
            owner: (installation.account?.login ?? '') as string,
            pageUrl: installation.account?.html_url ?? '',
            avatarUrl: installation.account?.avatar_url ?? ''
          })
        )
        pushToast({
          title: translate('COMMON.TOAST_DEFAULT_SUCCESS_TITLE'),
          description: translate(
            'GITHUB.TOAST_ADD_CONNECTION_SUCCESS_DESCRIPTION'
          ),
          variant: 'success'
        })
      })
      .catch(console.error)
  }

  const deleteInstallation = (installationId: number) => {
    githubService
      .deleteInstallation(installationId)
      .then(() => {
        setInstallations((installations) =>
          installations.filter(
            (installation) => installation.id !== installationId
          )
        )
        pushToast({
          title: translate('COMMON.TOAST_DEFAULT_SUCCESS_TITLE'),
          description: translate(
            'GITHUB.TOAST_DELETE_CONNECTION_SUCCESS_DESCRIPTION'
          ),
          variant: 'success'
        })
      })
      .catch(console.error)
  }

  useEffect(() => {
    const controller = new AbortController()

    githubService
      .listUserInstallations({ signal: controller.signal })
      .then(({ installations }) =>
        installations.map((installation) => ({
          id: installation.id,
          // @ts-expect-error - It seems like login is not valid for enterprise level but I don't care about it
          owner: (installation.account?.login ?? '') as string,
          pageUrl: installation.account?.html_url ?? '',
          avatarUrl: installation.account?.avatar_url ?? ''
        }))
      )
      .then((result) => {
        setInstallations(result)
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])

  return { isLoading, installations, addInstallation, deleteInstallation }
}
