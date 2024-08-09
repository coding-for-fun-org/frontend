'use client'

import { useState } from 'react'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullsReviewDialog } from '@/components/github/root/pulls-review-dialog/pulls-review-dialog'
import { getFlattenCheckedPulls } from '@/components/github/root/pulls-review-dialog/utils'

import {
  useRepos,
  useUpdateRepoOrPull
} from '@/contexts/github/root/selected-pulls-provider'

export default function Page() {
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
      <div className="flex gap-4 h-fit">
        <Button
          type="button"
          label={translate('GITHUB.EXPAND_ALL_BUTTON')}
          disabled={repos === undefined}
          onClick={() => {
            handleExpandAllClick()
          }}
        />
        <Button
          type="button"
          label={translate('GITHUB.START_REVIEW_BUTTON')}
          disabled={flattenCheckedPulls.length <= 0}
          onClick={() => {
            handleSetIsOpenDialog(true)
          }}
        />
      </div>

      <PullsReviewDialog
        flattenCheckedPulls={flattenCheckedPulls}
        isDialogOpen={isDialogOpen}
        handleSetIsOpenDialog={handleSetIsOpenDialog}
      />
    </>
  )
}
