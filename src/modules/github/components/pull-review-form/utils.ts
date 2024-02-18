import type { TRepo } from '@/types/github/root/index'

import type { ICheckedPull } from './types'

export const getFlattenCheckedPulls = (
  repos: TRepo[] | undefined
): ICheckedPull[] => {
  if (!repos) {
    return []
  }

  return repos.reduce<ICheckedPull[]>((flattenPulls, repo) => {
    const pulls = repo.pulls

    if (!pulls) {
      return flattenPulls
    }

    const checkedPulls = pulls.filter((pull) => pull.checked)

    if (checkedPulls.length === 0) {
      return flattenPulls
    }

    return flattenPulls.concat(
      checkedPulls.map((pull) => ({
        owner: repo.owner,
        repo: repo.name,
        pullTitle: pull.title,
        pullNumber: pull.number,
        user: pull.user
      }))
    )
  }, [])
}
