'use client'

import { Skeleton } from '@/elements/root/skeleton/skeleton'
import { Table } from '@/elements/root/table/table'

import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'

import {
  ALL_INSTALLATION,
  useFilterChange
} from '@/contexts/github/root/filter-provider/filter-provider'
import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

import type { TRepo } from '@/types/github/root/index'

import { useFetchRepositories } from './hooks'

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
      {repos ? (
        <Table
          headers={[
            {
              key: 'header',
              items: [
                {
                  key: 'header-cell-0',
                  children: 'RH'
                }
              ]
            }
          ]}
          cells={repos.map((repo) => ({
            key: `row-${repo.owner}-${repo.name}`,
            items: [
              {
                key: `row-${repo.owner}-${repo.name}-cell-0`,
                className: 'w-3 content-start',
                children: 'RC'
              },
              {
                key: `row-${repo.owner}-${repo.name}-cell-1`,
                children: (
                  <PullListByRepo
                    key={`${repo.owner}-${repo.name}`}
                    installationId={repo.installationId}
                    owner={repo.owner}
                    repo={repo.name}
                    repoUrl={repo.url}
                    pulls={repo.pulls}
                    isRepoOpen={repo.isOpen}
                  />
                )
              }
            ]
          }))}
        />
      ) : null}
    </>
  )
}

export const PullsByRepo = () => {
  const { repos } = useRepos()
  const { filterValue } = useFilterChange()
  const filteredRepos =
    filterValue === ALL_INSTALLATION
      ? repos
      : repos?.filter((repo) => String(repo.installationId) === filterValue)

  return (
    <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
      <Repositories repos={filteredRepos} />
    </ul>
  )
}
