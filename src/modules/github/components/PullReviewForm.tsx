import axios from 'axios'
import { type ChangeEvent, type FC, useState } from 'react'

import { EPullRequestType, type TRepoHasCheck } from '@/types/github/root/index'
import type { PullReviewResponse } from '@/types/github/root/server'

interface CheckedPull {
  org: string
  repo: string
  pullNumber: number
}

const getCheckedPullsInfo = (
  repoHasCheckArray: TRepoHasCheck[]
): CheckedPull[] => {
  return repoHasCheckArray.reduce<CheckedPull[]>(
    (reviewPullRequests, repoHasCheck) => {
      const checkedPulls = repoHasCheck.pulls.filter((pull) => pull.isChecked)

      if (checkedPulls.length === 0) {
        return reviewPullRequests
      }

      return reviewPullRequests.concat(
        checkedPulls.map((pull) => ({
          org: repoHasCheck.org,
          repo: repoHasCheck.repo,
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
  const hasChecked = repoHasCheckArray.some((data) =>
    data.pulls.some((pull) => pull.isChecked === true)
  )

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value)
  }

  const reviewPullRequest = (
    owner: string,
    repo: string,
    pullNumber: number,
    event: EPullRequestType,
    body: string
  ) => {
    axios
      .post<PullReviewResponse>(
        `/api/github/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
        {
          event,
          body
        }
      )
      .then((response) => response.data)
      .then((result) => {
        console.log('result', result)
      })
      .catch(console.error)
  }

  const handleCommentClick = () => {
    const checkedPullsInfo = getCheckedPullsInfo(repoHasCheckArray)

    checkedPullsInfo.forEach((checkedPull) => {
      reviewPullRequest(
        checkedPull.org,
        checkedPull.repo,
        checkedPull.pullNumber,
        EPullRequestType.COMMENT,
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
          disabled={!hasChecked}
          onClick={handleCommentClick}
        >
          {EPullRequestType.COMMENT}
        </button>

        <button
          className="mx-2 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="button"
          disabled={!hasChecked}
        >
          {EPullRequestType.APPROVE}
        </button>
        <button
          className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="button"
          disabled={!hasChecked}
        >
          {EPullRequestType.REQUEST_CHANGES}
        </button>
      </div>
    </div>
  )
}
