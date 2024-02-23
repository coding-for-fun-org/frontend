import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon
} from '@radix-ui/react-icons'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dialog } from '@/elements/root/dialog/dialog'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { getFlattenCheckedPulls } from '@/components/github/root/pull-review-form/utils'

import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

export const PullsReviewDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { repos } = useRepos()
  const { translate } = useDictionary()
  const flattenCheckedPulls = getFlattenCheckedPulls(repos)
  const hasChecked = flattenCheckedPulls.length > 0

  const handleOpenDialog = () => {
    console.log(flattenCheckedPulls)
    setIsDialogOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsDialogOpen(open)
    }
  }

  const handleCancelClick = () => {
    setIsDialogOpen(false)
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
        title={'title'}
        children={
          <div>
            <div>
              <ChevronRightIcon
                onClick={() => console.log('next pull')}
                className="float-right hover:underline cursor-pointer m-2"
              />
              <ChevronLeftIcon
                onClick={() => console.log('previous pull')}
                className="float-right hover:underline cursor-pointer m-2"
              />
              <ExternalLinkIcon
                onClick={() => console.log('link to pull request')}
                className="float-right hover:underline cursor-pointer m-2"
              />
            </div>
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
