import { useQuery } from '@tanstack/react-query'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import { ECheckStatus } from '@/components/github/root/pull-list-item-status/types'

import type { TPull } from '@/types/github/root/index'
import type {
  RepoCheckRunsForRefResponse,
  RepoCommitsResponse
} from '@/types/github/root/server'

import { getCheckStatus, getCheckSuccessCount } from './utils'

export const useCheckStatus = (
  installationId: number,
  owner: string,
  repo: string,
  pull: TPull
) => {
  const { translate } = useDictionary()
  const {
    data: latestCommit,
    isLoading: isLatestCommitLoading,
    error: latestCommitError
  } = useQuery<RepoCommitsResponse[number] | undefined>({
    queryKey: queryKey.github.repoPullCommits(owner, repo, pull.number),
    queryFn: ({ signal }) =>
      githubService
        .listCommits(owner, repo, {
          params: {
            sha: pull.headRef,
            perPage: 1
          },
          signal
        })
        .then(([latestCommit]) => latestCommit)
  })
  const {
    data: requiredChecksName,
    isLoading: isRequiredChecksNameLoading,
    error: requiredChecksNameError
  } = useQuery<string[]>({
    queryKey: queryKey.github.branchRequiredStatusChecks(
      installationId,
      owner,
      repo,
      pull.baseRef
    ),
    queryFn: ({ signal }) =>
      githubService
        .listBranchRequiredStatusChecks(
          installationId,
          owner,
          repo,
          encodeURIComponent(pull.baseRef),
          { signal }
        )
        .then(({ contexts }) => contexts)
  })
  const {
    data: checkRuns,
    isLoading: isCheckRunsLoading,
    isPending: isCheckRunsPending,
    error: checkRunsError
  } = useQuery<RepoCheckRunsForRefResponse['check_runs']>({
    queryKey: queryKey.github.repoPullCommitCheckRuns(
      owner,
      repo,
      pull.number,
      latestCommit?.sha ?? ''
    ),
    queryFn: ({ signal }) =>
      githubService
        .listCheckRuns(owner, repo, latestCommit!.sha ?? '', { signal })
        .then(({ check_runs }) => check_runs),
    enabled: !!latestCommit
  })
  const checkStatus = getCheckStatus(requiredChecksName, checkRuns)
  const checkSuccessCount = getCheckSuccessCount(requiredChecksName, checkRuns)
  const checkStatusText =
    checkSuccessCount !== undefined
      ? translate('GITHUB.PULL_CHECK_STATUS_TEXT', {
          successCount: checkSuccessCount,
          totalCount: requiredChecksName?.length ?? 0
        })
      : null

  if (checkStatus === ECheckStatus.RUNNING) {
    console.log('check it again every 30 seconds')
  }

  return {
    checkStatus,
    checkStatusText,
    isLoading:
      isLatestCommitLoading ||
      isRequiredChecksNameLoading ||
      isCheckRunsLoading ||
      isCheckRunsPending,
    // TODO: handle error better
    error: latestCommitError ?? requiredChecksNameError ?? checkRunsError
  }
}
