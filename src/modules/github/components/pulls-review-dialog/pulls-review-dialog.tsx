import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon
} from 'lucide-react'
import Link from 'next/link'
import { type ChangeEvent, useEffect, useState } from 'react'

import { Alert } from '@/elements/root/alert/alert'
import { Button } from '@/elements/root/button/button'
import { Dialog } from '@/elements/root/dialog/dialog'
import { Progress } from '@/elements/root/progress/progress'
import { RadioGroup } from '@/elements/root/radio-group/radio-group'
import { Textarea } from '@/elements/root/textarea/textarea'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullReviewDialogBody } from '@/components/github/root/pull-review-dialog-body/pull-review-dialog-body'

import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

import { EPullRequestType } from '@/types/github/root/index'

import { useSubmitForm } from './hooks'
import { getFlattenCheckedPulls } from './utils'

interface IPullsReviewDialogProps {
  isDialogOpen: boolean
  handleSetIsOpenDialog: (open: boolean) => void
  handleSetHasChecked: (value: boolean) => void
}

export const PullsReviewDialog = ({
  isDialogOpen,
  handleSetIsOpenDialog,
  handleSetHasChecked
}: IPullsReviewDialogProps) => {
  const [commentInput, setCommentInput] = useState<string>('')
  const [focusIndex, setFocusIndex] = useState<number>(0)
  const [radioButtonValue, setRadioButtonValue] = useState<EPullRequestType>(
    EPullRequestType.COMMENT
  )
  const { repos } = useRepos()
  const { translate } = useDictionary()
  const {
    progressData,
    submit,
    isLoading,
    error: errors,
    reset
  } = useSubmitForm()
  const radioButtonValues = [
    {
      value: EPullRequestType.COMMENT,
      label: translate('GITHUB.PULL_REVIEW_FORM_COMMENT_BUTTON')
    },
    {
      value: EPullRequestType.APPROVE,
      label: translate('GITHUB.PULL_REVIEW_FORM_APPROVE_BUTTON')
    },
    {
      value: EPullRequestType.REQUEST_CHANGES,
      label: translate('GITHUB.PULL_REVIEW_FORM_REQUEST_CHANGES_BUTTON')
    }
  ]
  const flattenCheckedPulls = getFlattenCheckedPulls(repos)
  const focusedPull =
    flattenCheckedPulls.length > 0 ? flattenCheckedPulls[focusIndex] : undefined

  const handleRadioButtonChange = (value: string) => {
    setRadioButtonValue(value as EPullRequestType)
  }

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(event.target.value)
  }

  const handleOpenChange = (open: boolean) => {
    setFocusIndex(0)
    handleSetIsOpenDialog(open)
  }

  const handleCancelClick = () => {
    handleSetIsOpenDialog(false)
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

  const handleSubmit = () => {
    submit({
      checkedPulls: flattenCheckedPulls,
      reviewType: radioButtonValue,
      comment: commentInput
    })
      .then(() => {
        handleSetIsOpenDialog(false)
      })
      .catch(console.error)
  }

  useEffect(() => {
    if (!isDialogOpen) {
      reset()
    }
  }, [isDialogOpen])

  useEffect(() => {
    if (flattenCheckedPulls.length > 0) {
      handleSetHasChecked(true)
    } else {
      handleSetHasChecked(false)
    }
  }, [flattenCheckedPulls.length])

  // This is not gonna happen.
  if (!focusedPull) {
    return <></>
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={handleOpenChange}
      title={focusedPull.pullTitle}
      width={750}
      children={
        <div className="flex-row w-full h-full">
          <div className="flex justify-end items-center gap-2 m-2">
            <Button
              role="button"
              variant="ghost"
              size="icon"
              className="!w-4 !h-4 hover:!bg-transparent"
            >
              <Tooltip tooltip={translate('HEADER.LINK_GITHUB_TOOLTIP')}>
                <Link href={focusedPull.url} target="_blank">
                  <ExternalLinkIcon width="17" height="17" />
                </Link>
              </Tooltip>
            </Button>

            <Button
              role="button"
              variant="ghost"
              size="icon"
              className="!w-4 !h-4 hover:!bg-transparent"
              disabled={focusIndex === 0}
              onClick={handleLeftClick}
            >
              <ChevronLeftIcon />
            </Button>

            <Button
              role="button"
              variant="ghost"
              size="icon"
              className="!w-4 !h-4 hover:!bg-transparent"
              onClick={handleRightClick}
              disabled={focusIndex === flattenCheckedPulls.length - 1}
            >
              <ChevronRightIcon />
            </Button>
          </div>
          <div>
            <PullReviewDialogBody description={focusedPull.body} />
          </div>
        </div>
      }
      footer={
        <div className="w-full h-full">
          <div className="flex w-full h-full flex-col gap-2">
            <div>
              {progressData.isRunning && (
                <Progress value={progressData.value} max={100} />
              )}
            </div>
            <div>
              {errors ? (
                <Alert
                  title={translate('COMMON.ALERT_DEFAULT_ERROR_TITLE')}
                  description={
                    <div>
                      {errors.map((error, index) => (
                        <div key={index}>
                          <span>
                            {translate(
                              'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_REPO',
                              { repoName: error.repo }
                            )}
                          </span>
                          <div></div>
                          <span>
                            {translate(
                              'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_PULL',
                              { pullTitle: error.pullTitle }
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  }
                  variant="error"
                  className="w-full"
                />
              ) : null}
            </div>
            <div>
              <Textarea
                className="resize-none"
                placeholder={translate(
                  'GITHUB.PULL_REVIEW_FORM_COMMENT_PLACEHOLDER'
                )}
                value={commentInput}
                onChange={handleCommentChange}
              />
            </div>
          </div>

          <div className="flex w-full h-full flex-row justify-between mt-5">
            <div className="flex">
              <RadioGroup
                className="flex-col"
                value={radioButtonValue}
                onValueChange={handleRadioButtonChange}
                values={radioButtonValues}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancelClick}>
                {translate('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')}
              </Button>

              <Button
                variant="primary"
                disabled={isLoading}
                onClick={() => handleSubmit()}
              >
                {translate('COMMON.DIALOG_REVIEW_BUTTON')}
              </Button>
            </div>
          </div>
        </div>
      }
    />
  )
}
