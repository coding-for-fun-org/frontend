import { type ChangeEvent, type FC, useState } from 'react'

import { AlertDialog } from '@/elements/root/alert-dialog/alert-dialog'
import { Progress } from '@/elements/root/progress/progress'
import { useToast } from '@/elements/root/toast/toast-provider'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { getCheckedPullsInfo } from '@/components/github/root/pull-review-form/utils'

import { axiosGithub } from '@/utils/github/root/axios'

import { EPullRequestType, type TRepoHasCheck } from '@/types/github/root/index'
import type { PullReviewResponse } from '@/types/github/root/server'

interface PullReviewFormProps {
  repoHasCheckArray: TRepoHasCheck[]
}

export const PullReviewForm: FC<PullReviewFormProps> = ({
  repoHasCheckArray
}) => {
  const [commentInput, setCommentInput] = useState<string>('')
  const [progressValue, setProgressValue] = useState<number>(0)
  const { pushToast } = useToast()
  const { dictionary, translate } = useDictionary()
  const hasComment = commentInput.length > 0
  const hasChecked = repoHasCheckArray.some((data) =>
    data.pulls.some((pull) => pull.isChecked === true)
  )

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value)
  }

  const reviewPullRequest = (
    owner: string,
    repo: string,
    pullTitle: string,
    pullNumber: number,
    event: EPullRequestType,
    body: string
  ) => {
    axiosGithub
      .post<PullReviewResponse>(
        `/api/github/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
        {
          event,
          body
        }
      )
      .then((response) => response.data)
      .then(() => {
        const translatedRepo = translate(
          'TOAST.COMMON.PULL_REVIEW_SUBMIT_DESCRIPTION_REPO',
          { repoName: repo }
        )
        const translatedPullTitle = translate(
          'TOAST.COMMON.PULL_REVIEW_SUBMIT_DESCRIPTION_PULL',
          { pullTitle: pullTitle }
        )
        pushToast({
          title: `[${dictionary.TOAST.SUCCESS.PULL_REVIEW_SUBMIT_TITLE}]`,
          description: (
            <div>
              <div>{translatedRepo}</div>
              <div>{translatedPullTitle}</div>
            </div>
          ),
          variant: 'success'
        })
      })
      .catch(() => {
        const translatedRepo = translate(
          'TOAST.COMMON.PULL_REVIEW_SUBMIT_DESCRIPTION_REPO',
          { repoName: repo }
        )
        const translatedPullTitle = translate(
          'TOAST.COMMON.PULL_REVIEW_SUBMIT_DESCRIPTION_PULL',
          { pullTitle: pullTitle }
        )
        pushToast({
          title: `[${dictionary.TOAST.ERROR.PULL_REVIEW_SUBMIT_TITLE}]`,
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

  const handleCommentClick = () => {
    const checkedPullsInfo = getCheckedPullsInfo(repoHasCheckArray)

    checkedPullsInfo.forEach((checkedPull) => {
      reviewPullRequest(
        checkedPull.org,
        checkedPull.repo,
        checkedPull.pullTitle,
        checkedPull.pullNumber,
        EPullRequestType.COMMENT,
        commentInput
      )
    })
  }

  const handleApproveClick = () => {
    const checkedPullsInfo = getCheckedPullsInfo(repoHasCheckArray)

    checkedPullsInfo.forEach((checkedPull) => {
      reviewPullRequest(
        checkedPull.org,
        checkedPull.repo,
        checkedPull.pullTitle,
        checkedPull.pullNumber,
        EPullRequestType.APPROVE,
        commentInput
      )
    })
  }

  const handleRequestChangeClick = () => {
    const checkedPullsInfo = getCheckedPullsInfo(repoHasCheckArray)

    checkedPullsInfo.forEach((checkedPull) => {
      reviewPullRequest(
        checkedPull.org,
        checkedPull.repo,
        checkedPull.pullTitle,
        checkedPull.pullNumber,
        EPullRequestType.REQUEST_CHANGES,
        commentInput
      )
    })
  }

  // 1. handleCommentClick이 실행되면  즉  COMMENT button이 눌러지면
  // 2.  AlertDialog 실행
  // 3. Submit이 눌러지면
  // 4.  reviewPullRequest 실행

  return (
    <div>
      <input
        type="text"
        placeholder="Leave a comment"
        className="w-96 h-40"
        value={commentInput}
        onChange={handleCommentChange}
        disabled={!hasChecked}
      />
      <div>
        <AlertDialog
          title={EPullRequestType.COMMENT}
          description="description"
          trigger={
            <button
              className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              type="button"
              disabled={!hasChecked || !hasComment}
              onClick={handleCommentClick}
            >
              {EPullRequestType.COMMENT}
            </button>
          }
          cancelLabel="Cancle"
          actionLabel="Submit"
        ></AlertDialog>

        <button
          className="mx-2 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="button"
          disabled={!hasChecked}
          onClick={handleApproveClick}
        >
          {EPullRequestType.APPROVE}
        </button>
        <button
          className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="button"
          disabled={!hasChecked || !hasComment}
          onClick={handleRequestChangeClick}
        >
          {EPullRequestType.REQUEST_CHANGES}
        </button>
      </div>
    </div>
  )
}
