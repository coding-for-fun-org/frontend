import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dialog } from '@/elements/root/dialog/dialog'
import { RadioGroup } from '@/elements/root/radio-group/radio-group'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullReviewDialogBody } from '@/components/github/root/pull-review-dialog-body/pull-review-dialog-body'
import { PullReviewForm } from '@/components/github/root/pull-review-form/pull-review-form'
import { getFlattenCheckedPulls } from '@/components/github/root/pull-review-form/utils'

import { useRepos } from '@/contexts/github/root/selected-pulls-provider'

interface IPullsReviewDialogProps {
  isDialogOpen: boolean
  handleOpenDialog: (open: boolean) => void
}

export const PullsReviewDialog = ({
  isDialogOpen,
  handleOpenDialog
}: IPullsReviewDialogProps) => {
  // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [radioButtonValue, setRadioButtonValue] = useState('1')
  const radioButtonValues = [
    {
      value: '1',
      label: 'Comment'
    },
    {
      value: '2',
      label: 'Approve'
    },
    {
      value: '3',
      label: 'Request Changes'
    }
  ]
  const { repos } = useRepos()
  const { translate } = useDictionary()
  const flattenCheckedPulls = getFlattenCheckedPulls(repos)
  const hasChecked = flattenCheckedPulls.length > 0
  const [focusIndex, setFocusIndex] = useState<number>(0)

  // const handleOpenDialog = () => {
  //   console.log('flattenCheckedPulls', flattenCheckedPulls)
  //   setIsDialogOpen(true)
  //   setFocusIndex(0)
  // }

  const handleOpenChange = (open: boolean) => {
    setFocusIndex(0)
    handleOpenDialog(open)
  }

  const handleCancelClick = () => {
    handleOpenDialog(false)
    setFocusIndex(0)
  }

  const handleLeftClick = () => {
    if (focusIndex === 0) {
      return
    }
    setFocusIndex((prev) => prev - 1)
  }

  const handleRightClick = () => {
    if (focusIndex === flattenCheckedPulls.length - 1) {
      return
    }

    setFocusIndex((prev) => prev + 1)
  }
  const handleReviewDialog = (radioButtonValue: string) => {
    console.log(`handleReviewDialog = ${radioButtonValue}`)
  }

  return (
    <>
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
                  href={flattenCheckedPulls[focusIndex]?.url ?? ''}
                  target="_blank"
                >
                  <ExternalLinkIcon className="float-right hover:underline cursor-pointer m-2" />
                </Link>
              </Tooltip>
            </div>
            <PullReviewDialogBody
              description={flattenCheckedPulls[focusIndex]?.body ?? ''}
            />
          </div>
        }
        footer={
          <>
            <RadioGroup
              className="cursor-pointer flex-col"
              value={radioButtonValue}
              onValueChange={setRadioButtonValue}
              values={radioButtonValues}
            />

            <Button variant="outline" onClick={handleCancelClick}>
              {translate('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')}
            </Button>

            <Button
              variant="primary"
              onClick={() => handleReviewDialog(radioButtonValue)}
            >
              {translate('COMMON.DIALOG_REVIEW_BUTTON')}
            </Button>
          </>
        }
      />
    </>
  )
}
