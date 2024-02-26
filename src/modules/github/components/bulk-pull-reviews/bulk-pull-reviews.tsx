'use client'

import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'
import { PullReviewForm } from '@/components/github/root/pull-review-form/pull-review-form'
import { PullsReviewDialog } from '@/components/github/root/pulls-review-dialog/pulls-review-dialog'

import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

import { useFetchRepositories } from './hooks'

const Repositories = () => {
  const { isLoading } = useFetchRepositories()
  const { repos } = useRepos()

  if (isLoading) {
    return Array.from({ length: 25 }).map((_, index) => (
      <li key={index} className="w-1/2">
        <Skeleton variant="rect" />
      </li>
    ))
  }

  // TODO: handle error case

  if (!repos) {
    return null
  }

  return repos.map((repo) => (
    <PullListByRepo
      key={`${repo.owner}-${repo.name}`}
      installationId={repo.installationId}
      owner={repo.owner}
      repo={repo.name}
      repoUrl={repo.url}
      pulls={repo.pulls}
    />
  ))
}

export const BulkPullReviews = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const handleOpenDialog = (open: boolean) => {
    setIsDialogOpen(open)
  }
  return (
    <div className="flex w-full h-full gap-5">
      <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
        <Repositories />
      </ul>
      <div className="flex flex-col h-full">
        <Button
          type="button"
          label={'Start Review'}
          // disabled={!hasChecked}
          onClick={() => setIsDialogOpen(true)}
        ></Button>
      </div>
      <div>
        <PullsReviewDialog
          isDialogOpen={isDialogOpen}
          handleOpenDialog={handleOpenDialog}
        />
      </div>
      <div className="flex-1">
        <PullReviewForm />
      </div>
    </div>
  )
}
