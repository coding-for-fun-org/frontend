import type { RepoCheckRunsForRefResponse } from '@/types/github/root/server'

import { ECheckStatus } from './types'

export const getCheckStatus = (
  requiredChecksName: string[] | undefined,
  checkRuns: RepoCheckRunsForRefResponse['check_runs'] | undefined
): ECheckStatus | undefined => {
  if (!requiredChecksName || !checkRuns) {
    return undefined
  }

  const hasNonSuccessChecks = checkRuns.some(
    (checkRun) =>
      requiredChecksName.includes(checkRun.name) &&
      checkRun.status === 'completed' &&
      checkRun.conclusion !== 'success'
  )

  if (hasNonSuccessChecks) {
    return ECheckStatus.FAILED
  }

  const hasRunningChecks = checkRuns.some(
    (checkRun) =>
      requiredChecksName.includes(checkRun.name) &&
      (checkRun.status === 'queued' || checkRun.status === 'in_progress')
  )

  if (hasRunningChecks) {
    return ECheckStatus.RUNNING
  }

  const hasAllRequiredChecks = requiredChecksName.every((checkName) =>
    checkRuns.some((checkRun) => checkRun.name === checkName)
  )

  if (!hasAllRequiredChecks) {
    return ECheckStatus.RUNNING
  }

  return ECheckStatus.SUCCESS
}

export const getCheckSuccessCount = (
  requiredChecksName: string[] | undefined,
  checkRuns: RepoCheckRunsForRefResponse['check_runs'] | undefined
): number | undefined => {
  if (!requiredChecksName || !checkRuns) {
    return undefined
  }

  return checkRuns.filter((checkRun) => {
    return (
      requiredChecksName.includes(checkRun.name) &&
      checkRun.status === 'completed' &&
      checkRun.conclusion === 'success'
    )
  }).length
}
