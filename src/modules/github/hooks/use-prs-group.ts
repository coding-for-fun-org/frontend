import axios from 'axios'
import { useEffect, useState } from 'react'

import { ELocalStorageKey } from '@/types/root/index'

import type { TGithubPullRequestGroup } from '@/types/github/root/index'
import type {
  InstallationRepositoriesResponse,
  RepoPullsResponse,
  UserInstallationsResponse
} from '@/types/github/root/server'

export const usePrsGroup = () => {
  const [prsGroup, setPrsGroup] = useState<TGithubPullRequestGroup[]>()

  useEffect(() => {
    axios
      .get<UserInstallationsResponse>('/api/github/user/installations', {
        headers: {
          Authorization: localStorage.getItem(
            ELocalStorageKey.AUTH_GITHUB_ACCESS_TOKEN
          )
        }
      })
      .then((response) => response.data)
      .then(({ installations }) =>
        Promise.all(
          installations.map((installation) =>
            axios
              .get<InstallationRepositoriesResponse>(
                `/api/github/user/installations/${installation.id}/repositories`,
                {
                  headers: {
                    Authorization: localStorage.getItem(
                      ELocalStorageKey.AUTH_GITHUB_ACCESS_TOKEN
                    )
                  }
                }
              )
              .then((response) => response.data)
              .then(({ repositories }) => repositories)
          )
        )
          .then((reposByInstallation) =>
            reposByInstallation.flatMap((repos) => repos)
          )
          .then((repos) =>
            Promise.all(
              repos.map((repo) =>
                axios
                  .get<RepoPullsResponse>(
                    `/api/github/repos/${repo.owner.login}/${repo.name}/pulls`,
                    {
                      headers: {
                        Authorization: localStorage.getItem(
                          ELocalStorageKey.AUTH_GITHUB_ACCESS_TOKEN
                        )
                      }
                    }
                  )
                  .then((response) => response.data)
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
  }, [])

  return { prsGroup }
}
