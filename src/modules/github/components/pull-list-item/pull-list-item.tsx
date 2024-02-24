import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Dialog } from '@/elements/root/dialog/dialog'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullListItemStatus } from '@/components/github/root/pull-list-item-status/pull-list-item-status'
import { PullReviewDialogBody } from '@/components/github/root/pull-review-dialog-body/pull-review-dialog-body'

import type { TPull } from '@/types/github/root/index'

interface IPullListItemProps {
  installationId: number
  owner: string
  repo: string
  pull: TPull
  handlePullCheckChange: (pullNumber: number) => void
}

export const PullListItem = ({
  installationId,
  owner,
  repo,
  pull,
  handlePullCheckChange
}: IPullListItemProps) => {
  const { translate } = useDictionary()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsDialogOpen(open)
    }
  }

  const handleCancelClick = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        id={`${repo}.${pull.number}`}
        className="flex-none"
        checked={pull.checked}
        onCheckedChange={() => {
          handlePullCheckChange(pull.number)
        }}
      />
      <span
        className="underline-offset-4 hover:underline cursor-pointer"
        onClick={handleOpenDialog}
      >
        {pull.title}
      </span>

      <Dialog
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
        title={pull.title}
        children={
          <div>
            <div>
              <ChevronRightIcon
                onClick={() => console.log('next pull')}
                className="float-right hover:underline cursor-pointer m-2"
              />
              <ChevronLeftIcon
                onClick={() => console.log('previous pull')}
                className="float-right hover:underline cursor-pointer m-2"
              />
              <Tooltip tooltip={translate('HEADER.LINK_GITHUB_TOOLTIP')}>
                <Link href={pull.url} target="_blank">
                  <ExternalLinkIcon
                    onClick={() => console.log('link to pull request')}
                    className="float-right hover:underline cursor-pointer m-2"
                  />
                </Link>
              </Tooltip>
            </div>
            <PullReviewDialogBody description={pull.body} />
          </div>
        }
        footer={
          <>
            <Button variant="outline" onClick={handleCancelClick}>
              {translate('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')}
            </Button>
            <Button variant="primary">
              {translate('COMMON.DIALOG_REVIEW_BUTTON')}
            </Button>
          </>
        }
      />

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
