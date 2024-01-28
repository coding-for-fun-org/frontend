import { type FC } from 'react'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { useAppInstallationWindow } from './hooks'

interface INewConnectionButtonProps {
  addInstallation: (installationId: number) => void
}

export const NewConnectionButton: FC<INewConnectionButtonProps> = ({
  addInstallation
}) => {
  const { translate } = useDictionary()
  const { openWindow } = useAppInstallationWindow((data) => {
    const { installationId, setupAction } = data

    if (setupAction === 'install' && installationId !== null) {
      addInstallation(Number(installationId))
    }
  })

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
