import axios from 'axios'
import { type ChangeEvent, type FC, useState } from 'react'

import { EPullRequestType, type TRepoHasCheck } from '@/types/github/root/index'
import { type PullReviewResponse } from '@/types/github/root/server'

interface PullRequestReviewFormProps {
  repoHasCheckArray: TRepoHasCheck[]
}

export const PullRequestReviewForm: FC<PullRequestReviewFormProps> = ({
  repoHasCheckArray
}) => {
  const [commentInput, setCommentInput] = useState<string>('')

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value)
  }

  const hasChecked = repoHasCheckArray.some((data) =>
    data.pulls.some((pull) => pull.isChecked === true)
  )

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
    repoHasCheckArray.forEach((data) =>
      data.pulls.forEach((pull) => {
        if (pull.isChecked && pull.user.login) {
          reviewPullRequest(
            data.org,
            data.repo,
            pull.number,
            EPullRequestType.COMMENT,
            commentInput
          )
        }
      })
    )
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
