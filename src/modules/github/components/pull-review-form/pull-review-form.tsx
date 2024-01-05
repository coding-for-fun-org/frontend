import { type ChangeEvent, type FC, useState } from 'react'

import { useToast } from '@/elements/root/toast/toast-provider'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { ELocalStorageKey } from '@/types/root/index'

import { axiosGithub } from '@/utils/github/root/axios'

import { EPullRequestType, type TRepoHasCheck } from '@/types/github/root/index'
import type { PullReviewResponse } from '@/types/github/root/server'

interface ICheckedPull {
  org: string
  repo: string
  pullTitle: string
  pullNumber: number
}

const getCheckedPullsInfo = (
  repoHasCheckArray: TRepoHasCheck[]
): ICheckedPull[] => {
  return repoHasCheckArray.reduce<ICheckedPull[]>(
    (reviewPullRequests, repoHasCheck) => {
      const checkedPulls = repoHasCheck.pulls.filter((pull) => pull.isChecked)

      if (checkedPulls.length === 0) {
        return reviewPullRequests
      }

      return reviewPullRequests.concat(
        checkedPulls.map((pull) => ({
          org: repoHasCheck.org,
          repo: repoHasCheck.repo,
          pullTitle: pull.title,
          pullNumber: pull.number
        }))
      )
    },
    []
  )
}

interface PullReviewFormProps {
  repoHasCheckArray: TRepoHasCheck[]
}

export const PullReviewForm: FC<PullReviewFormProps> = ({
  repoHasCheckArray
}) => {
  const [commentInput, setCommentInput] = useState<string>('')
  const { pushToast } = useToast()
  const { dictionary } = useDictionary()
  const { translate } = useDictionary()
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
        <button
          className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="button"
          disabled={!hasChecked || !hasComment}
          onClick={handleCommentClick}
        >
          {EPullRequestType.COMMENT}
        </button>

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
