import { useEffect } from 'react'

import { useGetInstallations } from '@/queries/github/root/use-installations'

import type {
  TCallbackApplicationInstall,
  TGithubInstallation
} from '@/types/github/root/index'

import { useAddInstallation, useDeleteInstallation } from './queries'

export const useAppInstallationWindow = (
  receiveMessageCB: (data: TCallbackApplicationInstall) => void
) => {
  let newWindow: Window | null = null

  const openWindow = () => {
    const width = 610
    const height = 700
    const left = window.screenLeft + window.outerWidth * 0.5 - width * 0.5
    const top = window.screenTop + window.outerHeight * 0.5 - height * 0.5

    newWindow = window.open(
      `https://github.com/apps/${process.env.NEXT_PUBLIC_GITHUB_APP_SLUG}/installations/select_target`,
      '_blank',
      `popup=true,left=${left},top=${top},width=${width},height=${height}`
    )
  }

  useEffect(() => {
    const receiveMessage = (
      event: MessageEvent<TCallbackApplicationInstall>
    ) => {
      if (event.origin !== process.env.NEXT_PUBLIC_PAGE_URL) {
        return
      }

      receiveMessageCB(event.data)
    }

    window.addEventListener('message', receiveMessage)

    return () => {
      window.removeEventListener('message', receiveMessage)

      if (newWindow) {
        newWindow.close()
      }
    }
  }, [])

  return {
    openWindow
  }
}

export const useInstallations = () => {
  const { data: installations, isLoading } = useGetInstallations<
    TGithubInstallation[]
  >(({ installations }) =>
    installations.map((installation) => ({
      id: installation.id,
      // @ts-expect-error - It seems like login is not valid for enterprise level but I don't care about it
      owner: (installation.account?.login ?? '') as string,
      pageUrl: installation.account?.html_url ?? '',
      avatarUrl: installation.account?.avatar_url ?? ''
    }))
  )
  const addMutation = useAddInstallation()
  const deleteMutation = useDeleteInstallation()

  return {
    isLoading,
    installations,
    addInstallation: addMutation.mutate,
    isDeleteLoading: deleteMutation.isPending,
    deleteInstallation: deleteMutation.mutateAsync
  }
}
