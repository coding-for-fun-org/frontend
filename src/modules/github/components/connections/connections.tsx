'use client'

import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { type FC, useState } from 'react'

import { AlertDialog } from '@/elements/root/alert-dialog/alert-dialog'
import { Avatar } from '@/elements/root/avatar/avatar'
import { Button } from '@/elements/root/button/button'
import { Table } from '@/elements/root/table/table'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { useAppInstallationWindow } from '@/components/github/root/new-connection-button/hooks'
import { NewConnectionButton } from '@/components/github/root/new-connection-button/new-connection-button'

import { useInstallations } from '@/hooks/github/root/use-installations'

export const Connections: FC = () => {
  const [error, setError] = useState<string>('')
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
  const { openWindow } = useAppInstallationWindow((data) => {
    const { installationId, setupAction } = data

    if (setupAction === 'install' && installationId !== null) {
      addInstallation(Number(installationId))
    }
  })

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
      .then(() => {
        handleOpenChange(false)
      })
      .catch(() => {
        setError(dialogData.installationOwner)
      })
  }

  const handleOpenChange = (open: boolean) => {
    if (open === false) {
      setDialogData({ open })
      if (dialogData.title === undefined) {
        return
      }
      setError('')
    }
  }

  const handleOpenDialog = (
    installationId: number,
    installationOwner: string
  ) => {
    setDialogData({
      open: true,
      title: translate('GITHUB.CONNECTION_DELETE_CONNECTION_TITLE'),
      installationId,
      installationOwner
    })
  }

  return (
    <div className="px-16">
      <Table
        headers={[
          {
            key: 'header',
            items: [
              { key: 'Connection', children: 'Connection' },
              {
                key: 'NewConnection',
                children: (
                  <Button
                    className="float-right"
                    variant="ghost"
                    size="icon"
                    icon={<PlusIcon className="w-full h-full" />}
                    onClick={() => {
                      openWindow()
                    }}
                  />
                )
              }
            ]
          }
        ]}
        cells={
          !isLoading
            ? installations!.map((installation) => ({
                key: `cell${installation.id}`,
                items: [
                  {
                    key: `owner${installation.id}`,
                    children: (
                      <div>
                        <Link
                          href={installation.pageUrl}
                          target="_blank"
                          className="underline-offset-4 hover:underline"
                        >
                          <span>{installation.owner}</span>
                        </Link>
                      </div>
                    )
                  },
                  {
                    key: `deleteConnection${installation.id}`,
                    children: (
                      <Button
                        className="float-right"
                        variant="ghost"
                        size="icon"
                        icon={<TrashIcon className="w-full h-full" />}
                        onClick={() => {
                          deleteInstallation(installation.id)
                        }}
                      />
                    )
                  }
                ]
              }))
            : [
                {
                  key: 'temp',
                  items: [
                    { key: 'tempItem', children: 'Loading...', colSpan: 2 }
                  ]
                }
              ]
        }
      ></Table>
      <AlertDialog
        open={dialogData.open}
        onOpenChange={handleOpenChange}
        title={dialogData.title}
        children={
          <>
            <div>
              {translate('GITHUB.CONNECTION_DELETE_CONNECTION_DESCRIPTION_1', {
                installationOwner: dialogData.installationOwner
              })}
              <br />
              {translate('GITHUB.CONNECTION_DELETE_CONNECTION_DESCRIPTION_2')}
            </div>
          </>
        }
        errorProps={
          error
            ? {
                description: <div>{error}</div>
              }
            : undefined
        }
        actionProps={{
          disabled: isLoading,
          onClick: handleActionClick,
          label: translate('COMMON.ALERT_DIALOG_DEFAULT_CONFIRM_BUTTON')
        }}
      ></AlertDialog>
    </div>
  )
}
