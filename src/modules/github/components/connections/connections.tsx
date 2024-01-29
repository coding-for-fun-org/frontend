'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { type FC, useState } from 'react'

import { AlertDialog } from '@/elements/root/alert-dialog/alert-dialog'
import { Avatar } from '@/elements/root/avatar/avatar'
import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { NewConnectionButton } from '@/components/github/root/new-connection-button/new-connection-button'

import { useInstallations } from '@/hooks/github/root/use-installations'

export const Connections: FC = () => {
  const [dialogData, setDialogData] = useState<
    | {
        open: true
        title: string
        installationId: number
        installationOwner: string
      }
    | {
        open: false
        title?: never
        installationId?: never
        installationOwner?: never
      }
  >({ open: false })
  const { translate } = useDictionary()
  const { isLoading, installations, addInstallation, deleteInstallation } =
    useInstallations()

  const handleActionClick = () => {
    if (!dialogData.open) {
      return
    }
    submit()
  }

  const submit = () => {
    if (!dialogData.installationId) {
      return
    }
    deleteInstallation(dialogData.installationId)
    handleOpenChange(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (open === false) {
      setDialogData({ open })
    }
  }

  const handleOpenDialog = (
    installationId: number,
    installationOwner: string
  ) => {
    setDialogData({
      open: true,
      title: translate('GITHUB.CONNECTION_DELETE_TITLE'),
      installationId,
      installationOwner
    })
  }
  return (
    <div className="px-16">
      <div className="flex justify-end">
        <NewConnectionButton addInstallation={addInstallation} />
      </div>
      <ul className="flex flex-col divide-y">
        {isLoading && <li>Loading...</li>}
        {!isLoading &&
          installations!.map((installation) => (
            <li key={installation.id} className="flex items-center py-2">
              <div className="flex-grow flex items-center gap-2">
                <Avatar
                  src={installation.avatarUrl}
                  className="w-6 h-6"
                  fallback={installation.owner}
                />
                <Link
                  href={installation.pageUrl}
                  target="_blank"
                  className="underline-offset-4 hover:underline"
                >
                  <span>{installation.owner}</span>
                </Link>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  icon={<TrashIcon className="w-full h-full" />}
                  onClick={() =>
                    handleOpenDialog(installation.id, installation.owner)
                  }
                />
              </div>
            </li>
          ))}
      </ul>
      <AlertDialog
        open={dialogData.open}
        onOpenChange={handleOpenChange}
        onActionClick={() => handleActionClick()}
        title={dialogData.title}
        children={
          <div>
            Are you sure delete connection of {dialogData.installationOwner}?
          </div>
        }
        actionLabel={translate('COMMON.ALERT_DIALOG_DEFAULT_CONFIRM_BUTTON')}
      ></AlertDialog>
    </div>
  )
}
