import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Checkbox } from '@/elements/root/checkbox/checkbox'

import { PullListItem } from '@/components/github/root/pull-list-item/pull-list-item'

import type { TPull } from '@/types/github/root/index'

interface PullListByRepoProps {
  org: string
  repo: string
  repoUrl: string
  pulls: TPull[]
  handlePullChange: (repo: string, pullNumber: number) => void
  handleRepoChange: (repo: string) => void
}

export const PullListByRepo = ({
  org,
  repo,
  repoUrl,
  pulls,
  handlePullChange,
  handleRepoChange
}: PullListByRepoProps) => {
  const [isRepoOpen, setIsRepoOpen] = useState<boolean>(false)
  const hasChild = pulls.length > 0
  const isRepoChecked = hasChild
    ? pulls.every((pull) => pull.isChecked === true)
    : false

  const handleRepoClick = () => {
    setIsRepoOpen((prev) => !prev)
  }

  return (
    <li className="list-none">
      <div className="flex gap-2 items-center">
        <Checkbox
          checked={isRepoChecked}
          onCheckedChange={() => handleRepoChange(repo)}
          disabled={!hasChild}
        />
        <Link
          href={repoUrl}
          target="_blank"
          className="underline-offset-4 hover:underline"
        >
          <span>{repo}</span>
        </Link>
        {hasChild && (
          <Button
            role="button"
            variant="ghost"
            size="icon"
            className="!w-4 !h-4 hover:!bg-transparent"
            onClick={handleRepoClick}
          >
            {isRepoOpen ? (
              <ChevronDownIcon className="w-full h-full" />
            ) : (
              <ChevronRightIcon className="w-full h-full" />
            )}
          </Button>
        )}
      </div>

      <ul
        className={clsx('flex flex-col gap-2 mt-2 ml-4', {
          hidden: !isRepoOpen
        })}
      >
        {pulls.map((pull) => (
          <li key={pull.number}>
            <PullListItem
              org={org}
              repo={repo}
              pull={pull}
              handlePullChange={handlePullChange}
            />
          </li>
        ))}
      </ul>
    </li>
  )
}
