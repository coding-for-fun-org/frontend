import Link from 'next/link'
import { memo, useState } from 'react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { Alert } from '@/elements/root/alert/alert'
import { Button } from '@/elements/root/button/button'
import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Dialog } from '@/elements/root/dialog/dialog'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullListItemStatus } from '@/components/github/root/pull-list-item-status/pull-list-item-status'

import type { TPull } from '@/types/github/root/index'

interface IPullListItemProps {
  installationId: number
  owner: string
  repo: string
  pull: TPull
  handlePullCheckChange: (pullNumber: number) => void
}

export const PullBody = memo(
  ({ description }: { description: string | null }) => {
    const { translate } = useDictionary()

    if (description) {
      return (
        <div className="markdown">
          <Markdown rehypePlugins={[rehypeRaw]}>{description}</Markdown>
        </div>
      )
    }
    return (
      <Alert
        variant="info"
        title={translate('COMMON.ALERT_NO_DATA_TITLE')}
        description={translate('COMMON.ALERT_NO_DATA_DESCRIPTION')}
      />
    )
  }
)

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
        children={<PullBody description={pull.body} />}
        footer={
          <>
            <Button variant="outline" onClick={handleCancelClick}>
              {translate('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')}
            </Button>
            <Link
              href={pull.url}
              target="_blank"
              className="underline-offset-4 hover:underline flex-1"
            >
              <Button variant="primary">
                {translate('COMMON.DIALOG_LINK_TO_PULL_REQUEST_BUTTON')}
              </Button>
            </Link>
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
