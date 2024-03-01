'use client'

import { type ReactNode } from 'react'

import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'
import { PullReviewForm } from '@/components/github/root/pull-review-form/pull-review-form'

import {
  SelectedPullsProvider,
  useRepos
} from '@/contexts/github/root/selected-pulls-provider'

import { useFetchRepositories } from './hooks'

interface IBulkPullReviewsLayoutProps {
  repositories: ReactNode
  pullReviewForm: ReactNode
}

const BulkPullReviewsLayout = ({
  repositories,
  pullReviewForm
}: IBulkPullReviewsLayoutProps) => {
  return (
    <SelectedPullsProvider>
      <div className="flex w-full h-full gap-5">
        <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {repositories}
        </ul>

        <div className="flex-1">{pullReviewForm}</div>
      </div>
    </SelectedPullsProvider>
  )
}

const Repositories = () => {
  const [isRepoAllOpen, setIsRepoAllOpen] = useState<boolean>(false)
  const { isLoading } = useFetchRepositories()
  const { repos } = useRepos()
  const handleExpandAllClick = (value: boolean) => {
    console.log('value', value)
    setIsRepoAllOpen((value) => !value)
  }

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

  return (
    <>
      <div>
        <Button
          type="button"
          label={isRepoAllOpen ? 'Expand Close' : 'Expand Open'}
          onClick={() => handleExpandAllClick(isRepoAllOpen)}
        ></Button>
      </div>
      {repos.map((repo) => (
        <PullListByRepo
          key={`${repo.owner}-${repo.name}`}
          installationId={repo.installationId}
          owner={repo.owner}
          repo={repo.name}
          repoUrl={repo.url}
          pulls={repo.pulls}
          isRepoAllOpen={isRepoAllOpen}
        />
      ))}
    </>
  )
}

export const BulkPullReviews = () => {
  return (
    <BulkPullReviewsLayout
      repositories={<Repositories />}
      pullReviewForm={<PullReviewForm />}
    />
  )
}
