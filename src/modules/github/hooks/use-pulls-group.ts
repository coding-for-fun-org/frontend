import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { useToast } from '@/elements/root/toast/toast-provider'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { githubService } from '@/services/root/github'

import { queryKey } from '@/utils/root/index'

import type { TGithubPullRequestGroup } from '@/types/github/root/index'

const fetchPullsGroup = async (signal: AbortSignal | undefined) => {
  return githubService
    .listUserInstallations({ signal })
    .then(({ installations }) =>
      Promise.all(
        installations.map((installation) =>
          githubService
            .listUserInstallationRepositories(installation.id, { signal })
            .then(({ repositories }) => repositories)
        )
      )
        .then((reposByInstallation) =>
          reposByInstallation.flatMap((repos) => repos)
        )
        .then((repos) =>
          Promise.all(
            repos.map((repo) =>
              githubService
                .listPullRequests(repo.owner.login, repo.name, { signal })
                .then((response) => ({
                  org: repo.owner.login,
                  repo: repo.name,
                  repoUrl: repo.html_url,
                  pulls: response.map((pull) => ({
                    pullUrl: pull.html_url,
                    state: pull.state,
                    number: pull.number,
                    title: pull.title,
                    user: {
                      login: pull.user?.login,
                      avatarUrl: pull.user?.avatar_url
                    }
                  }))
                }))
            )
          )
        )
    )
}

export const usePullsGroup = () => {
  const {
    data: pullsGroup,
    isLoading,
    isError
  } = useQuery<TGithubPullRequestGroup[]>(
    queryKey.github.pullsGroup(),
    async ({ signal }) => fetchPullsGroup(signal)
  )
  const { pushToast } = useToast()
  const { translate } = useDictionary()

  useEffect(() => {
    if (isError) {
      pushToast({
        title: translate('COMMON.TOAST_DEFAULT_ERROR_TITLE'),
        description: translate('COMMON.TOAST_DEFAULT_ERROR_DESCRIPTION'),
        variant: 'error'
      })
    }
  }, [isError])

  return { isLoading, pullsGroup }
}
