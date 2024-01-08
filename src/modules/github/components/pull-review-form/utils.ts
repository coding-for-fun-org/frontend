import type { TRepoHasCheck } from '@/types/github/root/index'

interface ICheckedPull {
  org: string
  repo: string
  pullTitle: string
  pullNumber: number
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
          pullNumber: pull.number
        }))
      )
    },
    []
  )
}
