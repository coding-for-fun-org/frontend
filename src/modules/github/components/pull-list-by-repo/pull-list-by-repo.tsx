import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { type FC, useState } from 'react'

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
    <div>
      <div className="flex">
        <Checkbox
          checked={isRepoChecked}
          onCheckedChange={() => handleRepoChange(repo)}
          disabled={!hasChild}
        />
        <Label className="ml-2">{repo}</Label>
        {hasChild &&
          (isRepoOpen ? (
            <ChevronDownIcon className="ml-2" onClick={handleRepoClick} />
          ) : (
            <ChevronRightIcon className="ml-2" onClick={handleRepoClick} />
          ))}
      </div>

      <div className={'ml-4' + (isRepoOpen ? '' : ' hidden')}>
        {pulls.map((pull) => (
          <div key={pull.number}>
            <Checkbox
              checked={pull.isChecked}
              onCheckedChange={() => {
                handlePullChange(repo, pull.number)
              }}
            />
            <Label className="ml-2">{pull.title}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}
