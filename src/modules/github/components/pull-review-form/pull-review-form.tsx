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
          title: `[${translate(
            'GITHUB.PULL_REVIEW_FORM_SUBMIT_TOAST_SUCCESS_TITLE'
          )}]`,
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
          'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_REPO',
          { repoName: repo }
        )
        const translatedPullTitle = translate(
          'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_PULL',
          { pullTitle: pullTitle }
        )

        pushToast({
          title: `[${translate(
            'GITHUB.PULL_REVIEW_FORM_SUBMIT_TOAST_ERROR_TITLE'
          )}]`,
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
        placeholder={translate('GITHUB.PULL_REVIEW_FORM_COMMENT_PLACEHOLDER')}
        value={commentInput}
        onChange={handleCommentChange}
        disabled={!hasChecked}
      />

      <div>
        <Button
          type="button"
          disabled={!hasChecked || !hasComment}
          label={translate('GITHUB.PULL_REVIEW_FORM_COMMENT_BUTTON')}
          onClick={handleCommentClick}
        ></Button>

        <Button
          type="button"
          disabled={!hasChecked}
          label={translate('GITHUB.PULL_REVIEW_FORM_APPROVE_BUTTON')}
          onClick={handleApproveClick}
        ></Button>

        <Button
          type="button"
          disabled={!hasChecked || !hasComment}
          label={translate('GITHUB.PULL_REVIEW_FORM_REQUEST_CHANGES_BUTTON')}
          onClick={handleRequestChangeClick}
        ></Button>
      </div>
    </div>
  )
}
