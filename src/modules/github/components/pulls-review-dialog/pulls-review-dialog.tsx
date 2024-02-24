import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dialog } from '@/elements/root/dialog/dialog'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullReviewDialogBody } from '@/components/github/root/pull-review-dialog-body/pull-review-dialog-body'
import { getFlattenCheckedPulls } from '@/components/github/root/pull-review-form/utils'

import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

export const PullsReviewDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { repos } = useRepos()
  const { translate } = useDictionary()
  const flattenCheckedPulls = getFlattenCheckedPulls(repos)
  const hasChecked = flattenCheckedPulls.length > 0
  const [focusIndex, setFocusIndex] = useState<number>(0)

  const handleOpenDialog = () => {
    console.log('flattenCheckedPulls', flattenCheckedPulls)
    setIsDialogOpen(true)
    setFocusIndex(0)
  }

  const handleOpenChange = (open: boolean) => {
    setFocusIndex(0)
    if (!open) {
      setIsDialogOpen(open)
    }
  }

  const handleCancelClick = () => {
    setIsDialogOpen(false)
    setFocusIndex(0)
  }

  const handleLeftClick = () => {
    console.log('previous pull')

    if (focusIndex === 0) {
      return
    }
    setFocusIndex((prev) => prev - 1)
  }

  const handleRightClick = () => {
    console.log('next pull')

    if (focusIndex === flattenCheckedPulls.length - 1) {
      return
    }

    setFocusIndex((prev) => prev + 1)
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Button
          type="button"
          label={'Start Review'}
          disabled={!hasChecked}
          onClick={handleOpenDialog}
        ></Button>
      </div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
        title={flattenCheckedPulls[focusIndex]?.pullTitle}
        children={
          <div>
            <div>
              <ChevronRightIcon
                onClick={handleRightClick}
                className="float-right hover:underline cursor-pointer m-2"
              />
              <ChevronLeftIcon
                onClick={handleLeftClick}
                className="float-right hover:underline cursor-pointer m-2"
              />
              <Tooltip tooltip={translate('HEADER.LINK_GITHUB_TOOLTIP')}>
                <Link
                  href={flattenCheckedPulls[focusIndex]?.url ?? '#'}
                  target="_blank"
                >
                  <ExternalLinkIcon className="float-right hover:underline cursor-pointer m-2" />
                </Link>
              </Tooltip>
            </div>
            <PullReviewDialogBody
              description={flattenCheckedPulls[focusIndex]?.body ?? '#'}
            />
          </div>
        }
        footer={
          <>
            <Button variant="outline" onClick={handleCancelClick}>
              {translate('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')}
            </Button>
            <Button variant="primary">
              {translate('COMMON.DIALOG_REVIEW_BUTTON')}
            </Button>
          </>
        }
      />
    </>
  )
}
