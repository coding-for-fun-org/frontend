import { useEffect, useState } from 'react'

import { githubService } from '@/services/root/github'

import type { TGithubPullRequestGroup } from '@/types/github/root/index'

export const usePullsGroup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pullsGroup, setPrsGroup] = useState<TGithubPullRequestGroup[]>()

  useEffect(() => {
    const controller = new AbortController()

    githubService
      .listUserInstallations({ signal: controller.signal })
      .then(({ installations }) =>
        Promise.all(
          installations.map((installation) =>
            githubService
              .listUserInstallationRepositories(installation.id, {
                signal: controller.signal
              })
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
                  .listPullRequests(repo.owner.login, repo.name, {
                    signal: controller.signal
                  })
                  .then((response) => ({
                    org: repo.owner.login,
                    repo: repo.name,
                    pulls: response.map((pull) => ({
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
      .then((result) => {
        setPrsGroup(result)
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])

  return { isLoading, pullsGroup }
}
