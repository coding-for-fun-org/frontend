'use client'

import { type ReactNode } from 'react'

import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'
import { PullReviewDialog } from '@/components/github/root/pull-review-dialog/pull-review-dialog'
import { PullReviewForm } from '@/components/github/root/pull-review-form/pull-review-form'

import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

import { useFetchRepositories } from './hooks'

interface IBulkPullReviewsLayoutProps {
  repositories: ReactNode
  pullReviewForm: ReactNode
  pullReviewDialog: ReactNode
}

const BulkPullReviewsLayout = ({
  repositories,
  pullReviewForm,
  pullReviewDialog
}: IBulkPullReviewsLayoutProps) => {
  return (
    <div className="flex w-full h-full gap-5">
      <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {repositories}
      </ul>

      <div>{pullReviewDialog}</div>
      <div className="flex-1">{pullReviewForm}</div>
    </div>
  )
}

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
  return (
    <BulkPullReviewsLayout
      repositories={<Repositories />}
      pullReviewForm={<PullReviewForm />}
      pullReviewDialog={<PullReviewDialog />}
    />
  )
}
