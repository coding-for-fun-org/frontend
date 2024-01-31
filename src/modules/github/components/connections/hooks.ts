import { useEffect } from 'react'

import type { TCallbackApplicationInstall } from '@/types/github/root/index'

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