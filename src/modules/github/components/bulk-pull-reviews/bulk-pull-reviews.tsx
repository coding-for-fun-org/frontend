'use client'

import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { useFetchRepositories } from '@/components/github/root/bulk-pull-reviews/hooks'
import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'

import { useFilterChange } from '@/contexts/github/root/filter-provider/filter-provider'
import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

import type { TRepo } from '@/types/github/root/index'

const Repositories = ({ repos }: { repos: TRepo[] | undefined }) => {
  const { isLoading } = useFetchRepositories()

  if (isLoading) {
    return Array.from({ length: 25 }).map((_, index) => (
      <li key={index} className="w-1/2">
        <Skeleton variant="rect" />
      </li>
    ))
  }

  // TODO: handle error case

  return (
    <>
      {repos
        ? repos.map((repo) => (
            <PullListByRepo
              key={`${repo.owner}-${repo.name}`}
              installationId={repo.installationId}
              owner={repo.owner}
              repo={repo.name}
              repoUrl={repo.url}
              pulls={repo.pulls}
              isRepoOpen={repo.isOpen}
            />
          ))
        : null}
    </>
  )
}

export const BulkPullReviews = () => {
  const { repos } = useRepos()
  const { filterValue } = useFilterChange()
  const filteredRepos =
    filterValue === 'All'
      ? repos
      : repos?.filter((repo) => `${repo.installationId}` === filterValue)

  return (
    <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
      <Repositories repos={filteredRepos} />
    </ul>
  )
}
