'use client'

import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { type FC, useState } from 'react'

import { AlertDialog } from '@/elements/root/alert-dialog/alert-dialog'
import { Avatar } from '@/elements/root/avatar/avatar'
import { Button } from '@/elements/root/button/button'
import { Table } from '@/elements/root/table/table'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { useInstallations } from '@/hooks/github/root/use-installations'

import { useAppInstallationWindow } from './hooks'

export const Connections: FC = () => {
  const [error, setError] = useState<string>('')
  const [dialogData, setDialogData] = useState<
    | {
        open: true
        installationId: number
        installationOwner: string
      }
    | {
        open: false
        installationId?: never
        installationOwner?: never
      }
  >({ open: false })
  const { translate } = useDictionary()
  const {
    isLoading,
    installations,
    addInstallation,
    isDeleteLoading,
    deleteInstallation
  } = useInstallations()
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
        setError(
          translate('GITHUB.CONNECTION_DELETE_CONNECTION_ERROR', {
            connection: dialogData.installationOwner
          })
        )
      })
  }

  const handleOpenChange = (open: boolean) => {
    if (open === false) {
      setDialogData({ open })

      setError('')
    }
  }

  const handleOpenDialog = (
    installationId: number,
    installationOwner: string
  ) => {
    setDialogData({ open: true, installationId, installationOwner })
  }

  return (
    <div className="px-16 overflow-auto max-h-full">
      <Table
        headers={[
          {
            key: 'header',
            className: 'sticky top-0 z-10',
            items: [
              {
                key: 'header-cell-0',
                children: translate('GITHUB.CONNECTION_TABLE_HEADER_CONNECTION')
              },
              {
                key: 'header-cell-1 w-3',
                children: (
                  <Button
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
                key: `row-${installation.id}`,
                items: [
                  {
                    key: `row-${installation.id}-cell-0`,
                    children: (
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
                    )
                  },
                  {
                    key: `row-${installation.id}-cell-1`,
                    className: 'w-3',
                    children: (
                      <Button
                        variant="ghost"
                        size="icon"
                        icon={<TrashIcon className="w-full h-full" />}
                        onClick={() => {
                          handleOpenDialog(installation.id, installation.owner)
                        }}
                      />
                    )
                  }
                ]
              }))
            : [
                {
                  key: 'loading-header',
                  items: [
                    {
                      key: 'loading-header-cell',
                      children: 'Loading...',
                      colSpan: 2
                    }
                  ]
                }
              ]
        }
      />

      <AlertDialog
        open={dialogData.open}
        onOpenChange={handleOpenChange}
        title={translate('GITHUB.CONNECTION_DELETE_CONNECTION_TITLE')}
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
          isLoading: isDeleteLoading,
          onClick: handleActionClick,
          label: translate('COMMON.ALERT_DIALOG_DEFAULT_CONFIRM_BUTTON')
        }}
      />
    </div>
  )
}
