'use client'

import { useRouter } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'

import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { urlService } from '@/services/root/url'

import { ELocalStorageKey } from '@/types/root/index'

import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'
import { PullReviewForm } from '@/components/github/root/pull-review-form/pull-review-form'

import { usePullsGroup } from '@/hooks/github/root/use-pulls-group'

import type { TRepoHasCheck } from '@/types/github/root/index'

export const BulkPullReviews: FC = () => {
  const router = useRouter()
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
    if (!localStorage.getItem(ELocalStorageKey.AUTH_GITHUB_ACCESS_TOKEN)) {
      router.replace(urlService.github.signIn())
    }
  }, [])

  useEffect(() => {
    if (!pullsGroup) {
      return
    }

    setRepoHasCheckArray(
      pullsGroup.map((pulls) => ({
        org: pulls.org,
        repo: pulls.repo,
        pulls: pulls.pulls.map((pull) => ({
          number: pull.number,
          title: pull.title,
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
