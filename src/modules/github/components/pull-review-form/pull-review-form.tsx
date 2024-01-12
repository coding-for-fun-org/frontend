import { type ChangeEvent, type FC, useState } from 'react'

import { AlertDialog } from '@/elements/root/alert-dialog/alert-dialog'
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

export const PullReviewForm: FC<PullReviewFormProps> = ({
  repoHasCheckArray
}) => {
  const [commentInput, setCommentInput] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [dialogData, setDialogData] = useState<{
    title: string
    description: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [progressValue, setProgressValue] = useState<number>(0)
  const [progressMaxValue, setProgressMaxValue] = useState<number>(0)
  const { pushToast } = useToast()
  const { translate } = useDictionary()
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
    pullTitle: string,
    pullNumber: number,
    reviewType: EPullRequestType,
    comment: string
  ) => {
    githubService
      .reviewPullRequest(owner, repo, pullNumber, { reviewType, comment })
      .then(() => {
        const translatedRepo = translate(
          'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_REPO',
          { repoName: repo }
        )
        const translatedPullTitle = translate(
          'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_PULL',
          { pullTitle: pullTitle }
        )

        pushToast({
          title: translate('GITHUB.TOAST_SUCCESS_TITLE'),
          description: (
            <div>
              <div>{translatedRepo}</div>
              <div>{translatedPullTitle}</div>
            </div>
          ),
          variant: 'success'
        })
        setProgressValue((prev) => prev + 1)
      })
      .catch(() => {
        const translatedRepo = translate(
          'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_REPO',
          { repoName: repo }
        )
        const translatedPullTitle = translate(
          'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_PULL',
          { pullTitle: pullTitle }
        )

        pushToast({
          title: translate('GITHUB.TOAST_ERROR_TITLE'),
          description: (
            <div>
              <div>{translatedRepo}</div>
              <div>{translatedPullTitle}</div>
            </div>
          ),
          variant: 'error'
        })
      })
  }

  const handleReviewChanges = (pullRequestType: EPullRequestType) => {
    const checkedPullsInfo = getCheckedPullsInfo(repoHasCheckArray)

    setProgressMaxValue(checkedPullsInfo.length)

    checkedPullsInfo.forEach((checkedPull) => {
      reviewPullRequest(
        checkedPull.org,
        checkedPull.repo,
        checkedPull.pullTitle,
        checkedPull.pullNumber,
        pullRequestType,
        commentInput
      )
    })
  }
  const handleOpenDialog = (type: EPullRequestType) => {
    setIsDialogOpen(true)
    console.log('run handleOpenDialog()')

    if (type === EPullRequestType.COMMENT) {
      setDialogData({ title: type, description: type })
    } else if (type === EPullRequestType.APPROVE) {
      setDialogData({ title: type, description: type })
    } else if (type === EPullRequestType.REQUEST_CHANGES) {
      setDialogData({ title: type, description: type })
    }
  }

  const handleCloseDialog = () => {
    console.log('run handleCloseDialog()')
  }

  const handleActionClick = () => {
    console.log('processing submit...')
    handleReviewChanges(dialogData?.title)
  }

  const handleCancelClick = () => {
    console.log('run handleCancelClick()')
    handleCloseDialog()
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
            open={isDialogOpen}
            onOpenChange={() => setIsDialogOpen((prev) => !prev)}
            onCancelClick={handleCancelClick}
            onActionClick={handleActionClick}
            children={
              isSubmitting && (
                <Progress value={progressValue} max={progressMaxValue} />
              )
            }
            title={dialogData?.title}
            description={dialogData?.description}
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
