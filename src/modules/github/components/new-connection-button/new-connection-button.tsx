import { type FC, useEffect } from 'react'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import type { TCallbackApplicationInstall } from '@/types/github/root/index'

interface INewConnectionButtonProps {
  addInstallation: (installationId: number) => void
}

export const NewConnectionButton: FC<INewConnectionButtonProps> = ({
  addInstallation
}) => {
  const { translate } = useDictionary()

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

      if (setupAction === 'install' && installationId !== null) {
        addInstallation(Number(installationId))
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
      label={translate('GITHUB.NEW_CONNECTION_BUTTON')}
      onClick={() => {
        openWindow()
      }}
    />
  )
}
