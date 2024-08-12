'use client'

import { SettingsIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dropdown } from '@/elements/root/dropdown/dropdown'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullsReviewDialog } from '@/components/github/root/pulls-review-dialog/pulls-review-dialog'
import { getFlattenCheckedPulls } from '@/components/github/root/pulls-review-dialog/utils'

import {
  useRepos,
  useUpdateRepoOrPull
} from '@/contexts/github/root/selected-pulls-provider'

export enum ESettingsCode {
  EXPAND_ALL_BUTTON = 'EXPAND_ALL_BUTTON',
  SELECT_ALL_DEPENDABOT_PULL_REQUESTS = 'SELECT_ALL_DEPENDABOT_PULL_REQUESTS',
  START_REVIEW_BUTTON = 'START_REVIEW_BUTTON'
}

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

  const values = [
    {
      label: translate('GITHUB.EXPAND_ALL_BUTTON'),
      value: ESettingsCode.EXPAND_ALL_BUTTON
    },
    {
      label: translate('GITHUB.SELECT_ALL_DEPENDABOT_PULL_REQUESTS'),
      value: ESettingsCode.SELECT_ALL_DEPENDABOT_PULL_REQUESTS
    },

    {
      label: translate('GITHUB.START_REVIEW_BUTTON'),
      value: ESettingsCode.START_REVIEW_BUTTON
    }
  ]

  const handleValueChange = (value: string) => {
    switch (value as ESettingsCode) {
      case ESettingsCode.EXPAND_ALL_BUTTON: {
        handleExpandAllClick()
        break
      }

      case ESettingsCode.SELECT_ALL_DEPENDABOT_PULL_REQUESTS: {
        console.log('GITHUB.SELECT_ALL_DEPENDABOT_PULL_REQUESTS')
        break
      }

      case ESettingsCode.START_REVIEW_BUTTON: {
        handleSetIsOpenDialog(true)
        break
      }
    }
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

        <Dropdown
          type="radio"
          data={{
            groups: [{ label: '', items: values }],
            value: '',
            onValueChange: handleValueChange
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            icon={
              <Tooltip tooltip={'NOT DECIDED'}>
                <SettingsIcon className="w-full h-full" />
              </Tooltip>
            }
          />
        </Dropdown>
      </div>

      <PullsReviewDialog
        flattenCheckedPulls={flattenCheckedPulls}
        isDialogOpen={isDialogOpen}
        handleSetIsOpenDialog={handleSetIsOpenDialog}
      />
    </>
  )
}
