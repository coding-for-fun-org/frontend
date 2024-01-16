import { type ChangeEvent, type FC, useState } from 'react'

import { AlertDialog } from '@/elements/root/alert-dialog/alert-dialog'
import { Alert } from '@/elements/root/alert/alert'
import { Button } from '@/elements/root/button/button'
import { Progress } from '@/elements/root/progress/progress'
import { Textarea } from '@/elements/root/textarea/textarea'
import { useToast } from '@/elements/root/toast/toast-provider'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { githubService } from '@/services/root/github'

import { getCheckedPullsInfo } from '@/components/github/root/pull-review-form/utils'

import { EPullRequestType, type TRepoHasCheck } from '@/types/github/root/index'

interface PullReviewFormProps {
  repoHasCheckArray: TRepoHasCheck[]
}

interface Errors {
  repo: string
  pullTitle: string
}

export const PullReviewForm: FC<PullReviewFormProps> = ({
  repoHasCheckArray
}) => {
  const [errors, setErrors] = useState<Errors[]>([])
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
  const [progressData, setProgressData] = useState<
    | {
        isRunning: true
        value: number
      }
    | {
        isRunning: false
        value?: never
      }
  >({ isRunning: false })
  const { translate } = useDictionary()
  const { pushToast } = useToast()
  const hasComment = commentInput.length > 0
  const hasChecked = repoHasCheckArray.some((data) =>
    data.pulls.some((pull) => pull.isChecked === true)
  )

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(event.target.value)
  }

  const reviewPullRequest = (
    owner: string,
    repo: string,
    pullNumber: number,
    reviewType: EPullRequestType,
    comment: string
  ) => {
    return githubService.reviewPullRequest(owner, repo, pullNumber, {
      reviewType,
      comment
    })
  }

  const submit = (pullRequestType: EPullRequestType) => {
    const checkedPullsInfo = getCheckedPullsInfo(repoHasCheckArray)

    const progressIncreaseValue = 100 / checkedPullsInfo.length

    setProgressData({ isRunning: true, value: 0 })

    Promise.allSettled(
      checkedPullsInfo.map((checkedPull) =>
        reviewPullRequest(
          checkedPull.org,
          checkedPull.repo,
          checkedPull.pullNumber,
          pullRequestType,
          commentInput
        ).finally(() => {
          setProgressData((prev) => {
            const value = prev.value! + progressIncreaseValue

            return {
              isRunning: true,
              value: value > 100 ? 100 : value
            }
          })
        })
      )
    )
      .then((result) => {
        console.log('result', result)
        if (result.every((item) => item.status === 'fulfilled')) {
          setDialogData({ open: false })
          setProgressData({ isRunning: false })
        } else {
          const errors = result.reduce<Errors[]>((accu, item, index) => {
            if (item.status === 'rejected') {
              return accu.concat([
                {
                  repo: checkedPullsInfo[index]!.repo,
                  pullTitle: checkedPullsInfo[index]!.pullTitle
                }
              ])
            }
            return accu
          }, [])
          setErrors(errors)
        }
        pushToast({
          title: translate('GITHUB.TOAST_SUCCESS_TITLE'),
          variant: 'success'
        })
      })
      .catch(console.error)
  }

  const handleOpenDialog = (type: EPullRequestType) => {
    console.log('run handleOpenDialog()')
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
    if (open === false) {
      setDialogData({ open })
      setProgressData({ isRunning: false })
      setErrors([])
    }
  }

  const handleActionClick = () => {
    console.log('processing submit...')
    if (!dialogData.open) {
      return
    }
    submit(dialogData.type)
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Textarea
          className="resize-none flex-grow"
          placeholder={translate('GITHUB.PULL_REVIEW_FORM_COMMENT_PLACEHOLDER')}
          value={commentInput}
          onChange={handleCommentChange}
          disabled={!hasChecked}
        />

        <div className="mt-5 flex justify-end gap-2">
          <AlertDialog
            open={dialogData.open}
            onOpenChange={handleOpenChange}
            onActionClick={handleActionClick}
            title={dialogData.title}
            children={
              <>
                {progressData.isRunning && (
                  <Progress value={progressData.value} max={100} />
                )}

                {errors.length > 0 && (
                  <Alert
                    variant="error"
                    title="error"
                    description={
                      <div>
                        {errors.map((error, index) => (
                          <div key={index}>
                            <div>- repo: {error.repo}</div>
                            <div>- pullTitle: {error.pullTitle}</div>
                          </div>
                        ))}
                      </div>
                    }
                  />
                )}
              </>
            }
            cancelLabel="Cancle"
            actionLabel="Submit"
          ></AlertDialog>

          <Button
            type="button"
            disabled={!hasChecked || !hasComment}
            label={translate('GITHUB.PULL_REVIEW_FORM_COMMENT_BUTTON')}
            onClick={() => handleOpenDialog(EPullRequestType.COMMENT)}
          ></Button>

          <Button
            type="button"
            disabled={!hasChecked}
            label={translate('GITHUB.PULL_REVIEW_FORM_APPROVE_BUTTON')}
            onClick={() => handleOpenDialog(EPullRequestType.APPROVE)}
          ></Button>

          <Button
            type="button"
            disabled={!hasChecked || !hasComment}
            label={translate('GITHUB.PULL_REVIEW_FORM_REQUEST_CHANGES_BUTTON')}
            onClick={() => handleOpenDialog(EPullRequestType.REQUEST_CHANGES)}
          ></Button>
        </div>
      </div>
    </>
  )
}
