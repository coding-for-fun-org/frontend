import { githubService } from '@/services/root/github'

import type { EPullRequestType, TRepoHasCheck } from '@/types/github/root/index'

interface ICheckedPull {
  org: string
  repo: string
  pullTitle: string
  pullNumber: number
  user: {
    login: string | undefined
  }
}

export const getCheckedPullsInfo = (
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
          pullNumber: pull.number,
          user: {
            login: pull.user.login
          }
        }))
      )
    },
    []
  )
}

export const processSubmit = (
  checkedPullsInfo: ICheckedPull[],
  handleProgressing: () => void,
  pullRequestType: EPullRequestType,
  commentInput: string
) => {
  return Promise.allSettled(
    checkedPullsInfo.map((checkedPull) =>
      githubService
        .reviewPullRequest(
          checkedPull.org,
          checkedPull.repo,
          checkedPull.pullNumber,
          {
            reviewType: pullRequestType,
            comment: commentInput
          }
        )
        .finally(() => {
          handleProgressing()
        })
    )
  )
}
