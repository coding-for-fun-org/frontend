import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { type FC, useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Label } from '@/elements/root/label/label'

import type { TPull } from '@/types/github/root/index'

interface PullListByRepoProps {
  repo: string
  pulls: TPull[]
  handlePullChange: (repo: string, pullNumber: number) => void
  handleRepoChange: (repo: string) => void
}

export const PullListByRepo: FC<PullListByRepoProps> = ({
  repo,
  pulls,
  handlePullChange,
  handleRepoChange
}) => {
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
          id={repo}
          checked={isRepoChecked}
          onCheckedChange={() => handleRepoChange(repo)}
          disabled={!hasChild}
        />
        <Label htmlFor={repo}>{repo}</Label>
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
            <div className="flex gap-2 items-center">
              <Checkbox
                id={`${repo}.${pull.number}`}
                checked={pull.isChecked}
                onCheckedChange={() => {
                  handlePullChange(repo, pull.number)
                }}
              />
              <Label htmlFor={`${repo}.${pull.number}`}>{pull.title}</Label>
            </div>
          </li>
        ))}
      </ul>
    </li>
  )
}
