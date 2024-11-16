'use client'

import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Skeleton } from '@/elements/root/skeleton/skeleton'
import { Table } from '@/elements/root/table/table'

import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'

import {
  ALL_INSTALLATION,
  useFilterChange
} from '@/contexts/github/root/filter-provider/filter-provider'
import {
  useRepos,
  useUpdateRepoOrPull
} from '@/contexts/github/root/selected-pulls-provider'

import type { TRepo } from '@/types/github/root/index'

import { useFetchRepositories } from './hooks'

const Repositories = ({ repos }: { repos: TRepo[] | undefined }) => {
  const { isLoading } = useFetchRepositories()
  const { toggleRepoCheckStatus, toggleAllRepoCheckStatus } =
    useUpdateRepoOrPull()

  if (isLoading) {
    return Array.from({ length: 25 }).map((_, index) => (
      <li key={index} className="w-1/2">
        <Skeleton variant="rect" />
      </li>
    ))
  }

  // TODO: handle error case
  const hasRepoChild =
    !isLoading && repos && repos.length > 0 && repos.some((repo) => repo.pulls)

  const isAllRepoChecked =
    !isLoading &&
    !!repos &&
    repos.length > 0 &&
    repos.filter((repo) => repo.isOpen).length > 0 &&
    repos
      .filter((repo) => repo.isOpen)
      .every(
        (repo) =>
          repo.pulls &&
          repo.pulls.length > 0 &&
          repo.pulls?.every((pull) => pull.checked)
      )

  if (!repos) {
    return null
  }

  return (
    <>
      <Table
        headers={[
          {
            key: 'header',
            items: [
              {
                key: 'header-cell-0',
                children: (
                  <Checkbox
                    checked={isAllRepoChecked}
                    onCheckedChange={() => {
                      toggleAllRepoCheckStatus(
                        repos.filter(
                          (repo) => repo.pulls && repo.pulls.length > 0
                        )
                      )
                    }}
                    disabled={!hasRepoChild}
                  />
                )
              },
              {
                key: 'header-cell-1',
                children: 'Repository / Pull request'
              }
            ]
          }
        ]}
        cells={repos.map((repo) => {
          const isRepoChecked = !!repo.pulls
            ? repo.pulls.length > 0 && repo.pulls.every((pull) => pull.checked)
            : false
          const hasChild = !!repo.pulls && repo.pulls.length > 0
          return {
            key: `row-${repo.owner}-${repo.name}`,
            items: [
              {
                key: `row-${repo.owner}-${repo.name}-cell-0`,
                className: 'w-3 content-start',
                children: (
                  <Checkbox
                    checked={isRepoChecked}
                    onCheckedChange={() =>
                      toggleRepoCheckStatus(repo.owner, repo.name)
                    }
                    disabled={!hasChild}
                  />
                )
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
          }
        })}
      />
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
