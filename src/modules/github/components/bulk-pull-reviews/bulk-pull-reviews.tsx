'use client'

import { useEffect } from 'react'

import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { useFilterChange } from '@/contexts/root/filter-provider/filter-provider'

import { ELocalStorageKey } from '@/types/root/index'

import { useFetchRepositories } from '@/components/github/root/bulk-pull-reviews/hooks'
import { useInstallations } from '@/components/github/root/connections/hooks'
import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'

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
  const { installations } = useInstallations()
  const { filterValue, setFilterValue } = useFilterChange()

  useEffect(() => {
    if (!installations || installations.length <= 0) {
      return
    }

    if (!filterValue) {
      localStorage.setItem(
        ELocalStorageKey.INSTALLATION_ID,
        `${installations[0].id}`
      )
      setFilterValue(`${installations[0].id}`)
    }
  }, [installations])

  return (
    <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
      <Repositories
        repos={repos?.filter(
          (repo) => `${repo.installationId}` === filterValue
        )}
      />
    </ul>
  )
}
