'use client'

import { signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import type { FC } from 'react'

import { useOctokit } from '@/hooks/useOctokit'

type TGithubPullRequest = {
  state: string
  number: number
  title: string
  user: {
    login: string | undefined
    avatarUrl: string | undefined
  }
}
type TGithubPullRequestGroup = {
  org: string
  repo: string
  pulls: TGithubPullRequest[]
}

export const BulkMergePrs: FC = () => {
  const octokit = useOctokit()
  const [githubPullRequestGroup, setGithubPullRequestGroup] =
    useState<TGithubPullRequestGroup[]>()

  console.log('githubPullRequestGroup', githubPullRequestGroup)

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
        setGithubPullRequestGroup(result)
      })
      .catch(console.error)
  }, [])

  return (
    <div>
      <button
        className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          signIn('github', { callbackUrl: '/github' }).catch(console.error)
        }}
      >
        log in
      </button>
      <button
        className="ml-2 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          signOut({ callbackUrl: '/github' }).catch(console.error)
        }}
      >
        log out
      </button>

      <ul>
        <li>list here</li>
      </ul>
    </div>
  )
}
