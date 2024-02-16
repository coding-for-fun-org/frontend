import {
  CheckIcon,
  Cross2Icon,
  DotFilledIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Skeleton } from '@/elements/root/skeleton/skeleton'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import type { TPull } from '@/types/github/root/index'

enum ECheckStatus {
  FAILED = 'FAILED',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS'
}

interface IPullListItemStatusProps {
  isLoading: boolean
  checkStatus: ECheckStatus | undefined
  error: Error | null
}

interface IPullListItemProps {
  installationId: number
  owner: string
  repo: string
  pull: TPull
  handlePullCheckChange: (pullNumber: number) => void
}

export const PullListItemStatus = ({
  isLoading,
  checkStatus,
  error
}: IPullListItemStatusProps) => {
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

export const PullListItem = ({
  installationId,
  owner,
  repo,
  pull,
  handlePullCheckChange
}: IPullListItemProps) => {
  const {
    data: checkStatus,
    isLoading,
    error
  } = useQuery<ECheckStatus>({
    queryKey: queryKey.github.pullStatus(owner, repo, pull.number),
    queryFn: async ({ signal }) => {
      return githubService
        .listCommits(owner, repo, {
          params: {
            sha: pull.headRef,
            perPage: 1
          },
          signal
        })
        .then(([latestCommit]) =>
          Promise.all([
            githubService
              .listBranchRequiredStatusChecks(
                owner,
                repo,
                pull.baseRef,
                installationId
              )
              .then(({ contexts: requiredChecksName }) => requiredChecksName),
            githubService
              .listCheckRunsForRef(owner, repo, latestCommit!.sha ?? '')
              .then(
                ({ check_runs: latestCommitCheckRuns }) => latestCommitCheckRuns
              )
          ])
        )
        .then(([requiredChecksName, latestCommitCheckRuns]) => {
          const hasRunningChecks = latestCommitCheckRuns.some(
            (checkRun) =>
              checkRun.status === 'queued' || checkRun.status === 'in_progress'
          )

          if (hasRunningChecks) {
            return ECheckStatus.RUNNING
          }

          const hasNonSuccessChecks = latestCommitCheckRuns.some(
            (checkRun) => checkRun.conclusion !== 'success'
          )

          if (hasNonSuccessChecks) {
            return ECheckStatus.FAILED
          }

          const hasAllRequiredChecks = requiredChecksName.every((checkName) =>
            latestCommitCheckRuns.some(
              (checkRun) => checkRun.name === checkName
            )
          )

          if (!hasAllRequiredChecks) {
            return ECheckStatus.RUNNING
          }

          return ECheckStatus.SUCCESS
        })
    }
  })

  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        id={`${repo}.${pull.number}`}
        className="flex-none"
        checked={pull.checked}
        onCheckedChange={() => {
          handlePullCheckChange(pull.number)
        }}
      />
      <Link
        href={pull.url}
        target="_blank"
        className="underline-offset-4 hover:underline flex-1"
      >
        <span>{pull.title}</span>
      </Link>
      <div className="w-6 h-6 flex items-center flex-none">
        <PullListItemStatus
          isLoading={isLoading}
          checkStatus={checkStatus}
          error={error}
        />
      </div>
    </div>
  )
}
