'use client'

import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'
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
  const { translate } = useDictionary()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [hasChecked, setHasChecked] = useState<boolean>(false)

  const handleSetIsOpenDialog = (open: boolean) => {
    setIsDialogOpen(open)
  }

  const handleSetHasChecked = (value: boolean) => {
    setHasChecked(value)
  }

  return (
    <div className="flex w-full h-full gap-5">
      <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
        <Repositories />
      </ul>
      <ul>
        <Button
          type="button"
          label={translate('GITHUB.PULL_REVIEW_FORM_START_REVIEW')}
          disabled={!hasChecked}
          onClick={() => setIsDialogOpen(true)}
        ></Button>
      </ul>
      <PullsReviewDialog
        isDialogOpen={isDialogOpen}
        handleSetIsOpenDialog={handleSetIsOpenDialog}
        handleSetHasChecked={handleSetHasChecked}
      />
    </div>
  )
}
