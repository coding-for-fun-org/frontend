import {
  CheckIcon,
  Cross2Icon,
  DotFilledIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons'

import { Skeleton } from '@/elements/root/skeleton/skeleton'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import type { TPull } from '@/types/github/root/index'

import { useCheckStatus } from './hooks'
import { ECheckStatus } from './types'

interface IPullListItemStatusProps {
  installationId: number
  owner: string
  repo: string
  pull: TPull
}

export const PullListItemStatus = ({
  installationId,
  owner,
  repo,
  pull
}: IPullListItemStatusProps) => {
  const { checkStatus, isLoading, error } = useCheckStatus(
    installationId,
    owner,
    repo,
    pull
  )

  if (isLoading) {
    return <Skeleton variant="rect" className="!h-full" />
  }

  if (error) {
    return (
      <Tooltip tooltip={error.message}>
        <ExclamationTriangleIcon className="w-full h-full text-error" />
      </Tooltip>
    )
  }

  if (checkStatus === ECheckStatus.SUCCESS) {
    return <CheckIcon className="w-full h-full text-success" />
  }

  if (checkStatus === ECheckStatus.RUNNING) {
    return <DotFilledIcon className="w-full h-full text-info" />
  }

  return <Cross2Icon className="w-full h-full text-error" />
}
