'use client'

import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { useFetchRepositories } from '@/components/github/root/bulk-pull-reviews/hooks'
import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'
import { PullsReviewDialog } from '@/components/github/root/pulls-review-dialog/pulls-review-dialog'
import { getFlattenCheckedPulls } from '@/components/github/root/pulls-review-dialog/utils'

import {
  useRepos,
  useUpdateRepoOrPull
} from '@/contexts/github/root/selected-pulls-provider'

import type { TRepo } from '@/types/github/root/index'

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
      {repos
        ? repos.map((repo) => (
            <PullListByRepo
              key={`${repo.owner}-${repo.name}`}
              installationId={repo.installationId}
              owner={repo.owner}
              repo={repo.name}
              repoUrl={repo.url}
              pulls={repo.pulls}
              isRepoOpen={repo.isOpen}
            />
          ))
        : null}
    </>
  )
}

export const BulkPullReviews = () => {
  const { repos } = useRepos()
  const flattenCheckedPulls = getFlattenCheckedPulls(repos)
  const { translate } = useDictionary()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { openAllRepo } = useUpdateRepoOrPull()

  const handleSetIsOpenDialog = (open: boolean) => {
    setIsDialogOpen(open)
  }

  const handleExpandAllClick = () => {
    openAllRepo()
  }

  return (
    <>
      <div className="flex w-full gap-5">
        <div className="flex-grow">
          <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
            <Repositories repos={repos} />
          </ul>
        </div>

        <div className="flex gap-4 h-fit">
          <Button
            type="button"
            label={translate('GITHUB.EXPAND_ALL_BUTTON')}
            onClick={handleExpandAllClick}
          />
          <Button
            type="button"
            label={translate('GITHUB.START_REVIEW_BUTTON')}
            disabled={flattenCheckedPulls.length <= 0}
            onClick={() => {
              setIsDialogOpen(true)
            }}
          />
        </div>
      </div>

      <PullsReviewDialog
        flattenCheckedPulls={flattenCheckedPulls}
        isDialogOpen={isDialogOpen}
        handleSetIsOpenDialog={handleSetIsOpenDialog}
      />
    </>
  )
}
