import { useQuery } from '@tanstack/react-query'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import type { TPull } from '@/types/github/root/index'

import { ECheckStatus } from './types'

export const useCheckStatus = (
  installationId: number,
  owner: string,
  repo: string,
  pull: TPull
) => {
  const {
    data: checkStatus,
    isLoading,
    error
  } = useQuery<ECheckStatus>({
    queryKey: queryKey.github.repoPullStatus(owner, repo, pull.number),
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

  return {
    checkStatus,
    isLoading,
    error
  }
}
