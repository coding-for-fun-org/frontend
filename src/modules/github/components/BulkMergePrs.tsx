'use client'

import { type FC, useEffect, useState } from 'react'

import { PullListByRepo } from '@/components/github/root/PullListByRepo'
import { PullReviewForm } from '@/components/github/root/PullReviewForm'

import { usePrsGroup } from '@/hooks/github/root/usePrsGroup'

import type { TRepoHasCheck } from '@/types/github/root/index'

export const BulkMergePrs: FC = () => {
  const { prsGroup } = usePrsGroup()
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
    if (!prsGroup) {
      return
    }

    setRepoHasCheckArray(
      prsGroup.map((pulls) => ({
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
  }, [prsGroup])

  return (
    <div className="flex flex-wrap">
      <div>
        {repoHasCheckArray.map((repoHasCheck) => (
          <PullListByRepo
            key={repoHasCheck.repo}
            repo={repoHasCheck.repo}
            pulls={repoHasCheck.pulls}
            handlePullChange={handlePullChange}
            handleRepoChange={handleRepoChange}
          />
        ))}
      </div>
      <div className="ml-60">
        <PullReviewForm repoHasCheckArray={repoHasCheckArray} />
      </div>
    </div>
  )
}
