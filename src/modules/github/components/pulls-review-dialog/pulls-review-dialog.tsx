import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { type ChangeEvent, useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dialog } from '@/elements/root/dialog/dialog'
import { RadioGroup } from '@/elements/root/radio-group/radio-group'
import { Textarea } from '@/elements/root/textarea/textarea'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullReviewDialogBody } from '@/components/github/root/pull-review-dialog-body/pull-review-dialog-body'
import { getFlattenCheckedPulls } from '@/components/github/root/pull-review-form/utils'

import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

import { EPullRequestType } from '@/types/github/root/index'

interface IPullsReviewDialogProps {
  isDialogOpen: boolean
  handleOpenDialog: (open: boolean) => void
}

export const PullsReviewDialog = ({
  isDialogOpen,
  handleOpenDialog
}: IPullsReviewDialogProps) => {
  const [commentInput, setCommentInput] = useState<string>('')
  const [radioButtonValue, setRadioButtonValue] = useState<EPullRequestType>(
    EPullRequestType.COMMENT
  )
  const radioButtonValues = [
    {
      value: EPullRequestType.COMMENT,
      label: 'Comment'
    },
    {
      value: EPullRequestType.APPROVE,
      label: 'Approve'
    },
    {
      value: EPullRequestType.REQUEST_CHANGES,
      label: 'Request Changes'
    }
  ]
  const { repos } = useRepos()
  const { translate } = useDictionary()
  const flattenCheckedPulls = getFlattenCheckedPulls(repos)
  const [focusIndex, setFocusIndex] = useState<number>(0)
  const focusedPull =
    flattenCheckedPulls.length > 0 ? flattenCheckedPulls[focusIndex] : undefined

  const handleRadioButtonClick = (value: string) => {
    setRadioButtonValue(value as EPullRequestType)
  }

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(event.target.value)
  }
  const handleOpenChange = (open: boolean) => {
    setFocusIndex(0)
    handleOpenDialog(open)
  }

  const handleCancelClick = () => {
    handleOpenDialog(false)
    setFocusIndex(0)
  }

  const handleLeftClick = () => {
    if (focusIndex === 0) {
      return
    }
    setFocusIndex((prev) => prev - 1)
  }

  const handleRightClick = () => {
    if (focusIndex === flattenCheckedPulls.length - 1) {
      return
    }

    setFocusIndex((prev) => prev + 1)
  }
  const handleReviewDialog = () => {
    switch (radioButtonValue) {
      case EPullRequestType.COMMENT:
        break
      case EPullRequestType.APPROVE:
        break
      case EPullRequestType.REQUEST_CHANGES:
        break
    }
  }

  // This is not gonna happen.
  if (!focusedPull) {
    return <></>
  }

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
        title={focusedPull.pullTitle}
        children={
          <div>
            <div>
              <ChevronRightIcon
                onClick={handleRightClick}
                className="float-right hover:underline cursor-pointer m-2"
              />
              <ChevronLeftIcon
                onClick={handleLeftClick}
                className="float-right hover:underline cursor-pointer m-2"
              />
              <Tooltip tooltip={translate('HEADER.LINK_GITHUB_TOOLTIP')}>
                <Link href={focusedPull.url} target="_blank">
                  <ExternalLinkIcon className="float-right hover:underline cursor-pointer m-2" />
                </Link>
              </Tooltip>
            </div>
            <PullReviewDialogBody description={focusedPull.body} />
          </div>
        }
        footer={
          <>
            <div>
              <Textarea
                className="resize-none flex-grow max-h-96"
                placeholder={translate(
                  'GITHUB.PULL_REVIEW_FORM_COMMENT_PLACEHOLDER'
                )}
                value={commentInput}
                onChange={handleCommentChange}
              />
            </div>
            <div>
              <RadioGroup
                className="flex-col"
                value={radioButtonValue}
                onValueChange={handleRadioButtonClick}
                values={radioButtonValues}
              />

              <Button variant="outline" onClick={handleCancelClick}>
                {translate('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')}
              </Button>

              <Button variant="primary" onClick={() => handleReviewDialog()}>
                {translate('COMMON.DIALOG_REVIEW_BUTTON')}
              </Button>
            </div>
          </>
        }
      />
    </>
  )
}
