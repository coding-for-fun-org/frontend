'use client'

import { type FC, useEffect, useState } from 'react'

import { DataList } from '@/components/github/root/DataList'
import { PullRequestReviewForm } from '@/components/github/root/PullRequestReviewForm'

import { usePrsGroup } from '@/hooks/github/root/usePrsGroup'

import { type TRepoHasCheck } from '@/types/github/root/index'

export const BulkMergePrs: FC = () => {
  const { prsGroup } = usePrsGroup()
  const [repoHasCheckArray, setRepoHasCheckArray] = useState<TRepoHasCheck[]>(
    []
  )

  const handlePullChange = (repo: string, pullNumber: number) => {
    setRepoHasCheckArray((prev) =>
      prev.map((data) => {
        if (data.repo === repo) {
          return {
            ...data,
            pulls: data.pulls.map((pull) => {
              if (pull.number === pullNumber) {
                return { ...pull, isChecked: !pull.isChecked }
              }
              return pull
            })
          }
        }
        return data
      })
    )
  }

  const handleRepoChange = (repo: string) => {
    setRepoHasCheckArray((prev) =>
      prev.map((data) => {
        if (data.repo === repo) {
          if (data.pulls.every((pull) => pull.isChecked === true)) {
            return {
              ...data,
              pulls: data.pulls.map((pull) => ({
                ...pull,
                isChecked: false
              }))
            }
          }
          return {
            ...data,
            pulls: data.pulls.map((pull) => ({
              ...pull,
              isChecked: true
            }))
          }
        }
        return data
      })
    )
  }

  useEffect(() => {
    if (!prsGroup) {
      return
    }
    setRepoHasCheckArray(
      prsGroup.map((data) => ({
        org: data.org,
        repo: data.repo,
        pulls: data.pulls.map((pull) => ({
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
        {repoHasCheckArray?.map((data) => (
          <DataList
            key={data.repo}
            repo={data.repo}
            pulls={data.pulls}
            handlePullChange={handlePullChange}
            handleRepoChange={handleRepoChange}
          />
        ))}
      </div>
      <div className="ml-60">
        <PullRequestReviewForm repoHasCheckArray={repoHasCheckArray} />
      </div>
    </div>
  )
}
