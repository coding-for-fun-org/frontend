import { type TRepo } from 'src/modules/github/types'

export const checkIfAllReposChecked = (
  isLoading: boolean,
  repos: TRepo[] | undefined
): boolean => {
  if (isLoading || !repos || repos.length === 0) return false

  const openRepos = repos.filter((repo) => repo.isOpen)
  if (openRepos.length === 0) return false

  return openRepos.every(
    (repo) =>
      repo.pulls &&
      repo.pulls.length > 0 &&
      repo.pulls.every((pull) => pull.checked)
  )
}
