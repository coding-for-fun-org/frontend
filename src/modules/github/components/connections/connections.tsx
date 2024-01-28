'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { type FC } from 'react'

import { Avatar } from '@/elements/root/avatar/avatar'
import { Button } from '@/elements/root/button/button'

import { NewConnectionButton } from '@/components/github/root/new-connection-button/new-connection-button'

import { useInstallations } from '@/hooks/github/root/use-installations'

export const Connections: FC = () => {
  const { isLoading, installations, addInstallation, deleteInstallation } =
    useInstallations()

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
                  onClick={() => {
                    deleteInstallation(installation.id)
                  }}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
