import { useEffect, useState } from 'react'

import type { TGithubPullRequestGroup } from '@/types/github/root/index'

import { useOctokit } from './useOctokit'

export const usePrsGroup = () => {
  const octokit = useOctokit()
  const [prsGroup, setPrsGroup] = useState<TGithubPullRequestGroup[]>()

  useEffect(() => {
    if (!octokit) {
      return
    }

    octokit
      .request('GET /user/repos', {
        per_page: 100
      })
      .then((response) => response.data)
      .then((repos) =>
        Promise.all(
          repos.map((repo) =>
            octokit
              .request('GET /repos/{owner}/{repo}/pulls', {
                owner: repo.owner.login,
                repo: repo.name
              })
              .then((response) => ({
                org: repo.owner.login,
                repo: repo.name,
                pulls: response.data.map((pull) => ({
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
      .then((result) => {
        setPrsGroup(result)
      })
      .catch(console.error)
  }, [octokit])

  return { prsGroup }
}
