import { type ChangeEvent, type FC, useState } from 'react'

import { Button } from '@/elements/root/button/button'
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
  const { pushToast } = useToast()
  const { dictionary, translate } = useDictionary()
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
      <Textarea
        className="resize-none"
        placeholder="Leave a comment"
        value={commentInput}
        onChange={handleCommentChange}
        disabled={!hasChecked}
      />

      <div>
        <Button
          type="button"
          disabled={!hasChecked || !hasComment}
          onClick={handleCommentClick}
        >
          {EPullRequestType.COMMENT}
        </Button>

        <Button
          type="button"
          disabled={!hasChecked}
          onClick={handleApproveClick}
        >
          {EPullRequestType.APPROVE}
        </Button>

        <Button
          type="button"
          disabled={!hasChecked || !hasComment}
          onClick={handleRequestChangeClick}
        >
          {EPullRequestType.REQUEST_CHANGES}
        </Button>
      </div>
    </div>
  )
}
