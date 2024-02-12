import { type ChangeEvent, useEffect, useState } from 'react'

import { AlertDialog } from '@/elements/root/alert-dialog/alert-dialog'
import { Button } from '@/elements/root/button/button'
import { Progress } from '@/elements/root/progress/progress'
import { Textarea } from '@/elements/root/textarea/textarea'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

import { useCurrentUser } from '@/hooks/github/root/use-current-user'

import { EPullRequestType } from '@/types/github/root/index'

import { useSubmitForm } from './hooks'
import { getFlattenCheckedPulls } from './utils'

export const PullReviewForm = () => {
  const { repos } = useRepos()
  const { user: currentUser } = useCurrentUser()
  const [commentInput, setCommentInput] = useState<string>('')
  const [dialogData, setDialogData] = useState<
    | {
        open: true
        type: EPullRequestType
        title: string
      }
    | {
        open: false
        type?: never
        title?: never
      }
  >({ open: false })
  const {
    progressData,
    submit,
    isLoading,
    error: errors,
    reset
  } = useSubmitForm()
  const { translate } = useDictionary()
  const hasComment = commentInput.length > 0
  const flattenCheckedPulls = getFlattenCheckedPulls(repos)
  const hasChecked = flattenCheckedPulls.length > 0
  const hasMyPull = flattenCheckedPulls.some(
    (data) => data.user.login === currentUser
  )

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(event.target.value)
  }

  const handleSubmit = (pullRequestType: EPullRequestType) => {
    submit({
      checkedPulls: flattenCheckedPulls,
      reviewType: pullRequestType,
      comment: commentInput
    })
      .then(() => {
        setDialogData({ open: false })
      })
      .catch(console.error)
  }

  const handleOpenDialog = (type: EPullRequestType) => {
    if (type === EPullRequestType.COMMENT) {
      setDialogData({
        open: true,
        type,
        title: translate('GITHUB.PULL_REVIEW_FORM_COMMENT_BUTTON')
      })
    } else if (type === EPullRequestType.APPROVE) {
      setDialogData({
        open: true,
        type,
        title: translate('GITHUB.PULL_REVIEW_FORM_APPROVE_BUTTON')
      })
    } else if (type === EPullRequestType.REQUEST_CHANGES) {
      setDialogData({
        open: true,
        type,
        title: translate('GITHUB.PULL_REVIEW_FORM_REQUEST_CHANGES_BUTTON')
      })
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setDialogData({ open })
    }
  }

  const handleActionClick = () => {
    if (!dialogData.open) {
      return
    }
    handleSubmit(dialogData.type)
  }

  useEffect(() => {
    if (!dialogData.open) {
      reset()
    }
  }, [dialogData])

  return (
    <>
      <div className="flex flex-col h-full">
        <Textarea
          className="resize-none flex-grow max-h-96"
          placeholder={translate('GITHUB.PULL_REVIEW_FORM_COMMENT_PLACEHOLDER')}
          value={commentInput}
          onChange={handleCommentChange}
          disabled={!hasChecked}
        />

        <div className="mt-5 flex justify-end gap-2">
          <AlertDialog
            open={dialogData.open}
            onOpenChange={handleOpenChange}
            title={dialogData.title}
            children={
              <>
                {progressData.isRunning && (
                  <Progress value={progressData.value} max={100} />
                )}
              </>
            }
            errorProps={
              errors
                ? {
                    description: (
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
                    )
                  }
                : undefined
            }
            actionProps={{
              disabled: isLoading,
              onClick: handleActionClick,
              label: translate('COMMON.ALERT_DIALOG_DEFAULT_SUBMIT_BUTTON')
            }}
          ></AlertDialog>

          <Button
            type="button"
            disabled={!hasChecked || !hasComment}
            label={translate('GITHUB.PULL_REVIEW_FORM_COMMENT_BUTTON')}
            onClick={() => handleOpenDialog(EPullRequestType.COMMENT)}
          ></Button>

          <Button
            type="button"
            disabled={!hasChecked || hasMyPull}
            label={translate('GITHUB.PULL_REVIEW_FORM_APPROVE_BUTTON')}
            onClick={() => handleOpenDialog(EPullRequestType.APPROVE)}
          ></Button>

          <Button
            type="button"
            disabled={!hasChecked || hasMyPull || !hasComment}
            label={translate('GITHUB.PULL_REVIEW_FORM_REQUEST_CHANGES_BUTTON')}
            onClick={() => handleOpenDialog(EPullRequestType.REQUEST_CHANGES)}
          ></Button>
        </div>
      </div>
    </>
  )
}
