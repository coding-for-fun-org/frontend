'use client'

import { type FC, useEffect } from 'react'

import { Button } from '@/elements/root/button/button'

import type { TCallbackApplicationInstall } from '@/types/github/root/index'

export const GrantPermissionButton: FC = () => {
  let newWindow: Window | null = null

  const openWindow = () => {
    const width = 610
    const height = 700
    const left = window.screenLeft + window.outerWidth * 0.5 - width * 0.5
    const top = window.screenTop + window.outerHeight * 0.5 - height * 0.5

    newWindow = window.open(
      'https://github.com/apps/coding-for-fun-local/installations/select_target',
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

      const { installationId, setupAction } = event.data

      if (setupAction === 'install') {
        console.log('installationId', installationId)
      }
    }

    window.addEventListener('message', receiveMessage)

    return () => {
      window.removeEventListener('message', receiveMessage)

      if (newWindow) {
        newWindow.close()
      }
    }
  }, [])

  return (
    <Button
      type="button"
      onClick={() => {
        openWindow()
      }}
    >
      grant permission
    </Button>
  )
}
