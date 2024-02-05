'use client'

import { type FC, useEffect, useState } from 'react'

import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'
import { PullReviewForm } from '@/components/github/root/pull-review-form/pull-review-form'

import type { TRepoHasCheck } from '@/types/github/root/index'

import { usePullsGroup } from './hooks'

export const BulkPullReviews: FC = () => {
  const { isLoading: isPullsGroupFetching, pullsGroup } = usePullsGroup()
  const [repoHasCheckArray, setRepoHasCheckArray] = useState<TRepoHasCheck[]>(
    []
  )

  const handlePullChange = (repo: string, pullNumber: number) => {
    setRepoHasCheckArray((prev) =>
      prev.map((repoHasCheck) => {
        if (repoHasCheck.repo === repo) {
          return {
            ...repoHasCheck,
            pulls: repoHasCheck.pulls.map((pull) => {
              if (pull.number === pullNumber) {
                return { ...pull, isChecked: !pull.isChecked }
              }

              return pull
            })
          }
        }
        return repoHasCheck
      })
    )
  }

  const handleRepoChange = (repo: string) => {
    setRepoHasCheckArray((prev) =>
      prev.map((repoHasCheck) => {
        if (repoHasCheck.repo === repo) {
          if (
            repoHasCheck.pulls.length > 0 &&
            repoHasCheck.pulls.every((pull) => pull.isChecked === true)
          ) {
            return {
              ...repoHasCheck,
              pulls: repoHasCheck.pulls.map((pull) => ({
                ...pull,
                isChecked: false
              }))
            }
          }

          return {
            ...repoHasCheck,
            pulls: repoHasCheck.pulls.map((pull) => ({
              ...pull,
              isChecked: true
            }))
          }
        }

        return repoHasCheck
      })
    )
  }

  useEffect(() => {
    if (!pullsGroup) {
      return
    }

    const hasUndefined = pullsGroup.some((pulls) => !pulls)

    if (hasUndefined) {
      return
    }

    setRepoHasCheckArray(
      pullsGroup.map((pulls) => ({
        org: pulls!.org,
        repo: pulls!.repo,
        repoUrl: pulls!.repoUrl,
        pulls: pulls!.pulls.map((pull) => ({
          number: pull.number,
          title: pull.title,
          pullUrl: pull.pullUrl,
          isChecked: false,
          user: {
            login: pull.user.login ?? ''
          }
        }))
      }))
    )
  }, [pullsGroup])

  return (
    <div className="flex w-full h-full gap-5">
      <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {!!isPullsGroupFetching &&
          Array.from({ length: 25 }).map((_, index) => (
            <li key={index} className="w-1/2">
              <Skeleton variant="rect" />
            </li>
          ))}
        {!isPullsGroupFetching &&
          repoHasCheckArray.map((repoHasCheck) => (
            <PullListByRepo
              key={repoHasCheck.repo}
              repo={repoHasCheck.repo}
              repoUrl={repoHasCheck.repoUrl}
              pulls={repoHasCheck.pulls}
              handlePullChange={handlePullChange}
              handleRepoChange={handleRepoChange}
            />
          ))}
      </ul>

      <div className="flex-1">
        <PullReviewForm repoHasCheckArray={repoHasCheckArray} />
      </div>
    </div>
  )
}
