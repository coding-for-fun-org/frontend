import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Dialog } from '@/elements/root/dialog/dialog'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullBody } from '@/components/github/root/pull-body/pull-body'
import { PullListItemStatus } from '@/components/github/root/pull-list-item-status/pull-list-item-status'

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
              <svg
                onClick={() => console.log('next pull')}
                className="float-right hover:underline cursor-pointer m-2"
                width="17"
                height="17"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                onClick={() => console.log('previous pull')}
                className="float-right hover:underline cursor-pointer m-2"
                width="17"
                height="17"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link href={pull.url} target="_blank">
                <svg
                  onClick={() => console.log('link to pull request')}
                  className="float-right hover:underline cursor-pointer m-2"
                  width="17"
                  height="17"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
            <PullBody description={pull.body} />
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
