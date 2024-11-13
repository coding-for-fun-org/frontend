import Link from 'next/link'

// import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { PullListItemStatus } from '@/components/github/root/pull-list-item-status/pull-list-item-status'

import type { TPull } from '@/types/github/root/index'

interface IPullListItemProps {
  installationId: number
  owner: string
  repo: string
  pull: TPull
  // handlePullCheckChange: (pullNumber: number) => void
}

export const PullListItem = ({
  installationId,
  owner,
  repo,
  pull
  // handlePullCheckChange
}: IPullListItemProps) => {
  return (
    <div className="flex gap-2 items-center">
      {/* <Checkbox */}
      {/*   id={`${repo}.${pull.number}`} */}
      {/*   className="flex-none" */}
      {/*   checked={pull.checked} */}
      {/*   onCheckedChange={() => { */}
      {/*     handlePullCheckChange(pull.number) */}
      {/*   }} */}
      {/* /> */}
      <Link
        href={pull.url}
        target="_blank"
        className="underline-offset-4 hover:underline"
      >
        <span>{pull.title}</span>
      </Link>

      <div className="w-6 h-6 flex items-center flex-none">
        <PullListItemStatus
          installationId={installationId}
          owner={owner}
          repo={repo}
          pull={pull}
        />
      </div>
    </div>
  )
}
