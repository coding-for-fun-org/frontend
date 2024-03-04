'use client'

import {
  type Dispatch,
  type ReactNode,
  createContext,
  useContext,
  useReducer
} from 'react'

import type { TPull, TRepo } from '@/types/github/root/index'
import type {
  InstallationRepositoriesResponse,
  RepoPullsResponse
} from '@/types/github/root/server'

type TState = {
  repos: TRepo[] | undefined
}

type TSelectedPullActionType =
  | {
      type: 'set-repos'
      payload: {
        reposByInstallationId:
          | {
              installationId: number
              repos: InstallationRepositoriesResponse['repositories']
            }[]
          | undefined
      }
    }
  | {
      type: 'set-pulls'
      payload: {
        owner: string
        repo: string
        pulls: RepoPullsResponse | undefined
      }
    }
  | {
      type: 'toggle-pull-check-status'
      payload: {
        owner: string
        repo: string
        pullNumber: number
      }
    }
  | {
      type: 'toggle-repo-check-status'
      payload: {
        owner: string
        repo: string
      }
    }
  | {
      type: 'toggle-repo-open-status'
      payload: {
        owner: string
        repo: string
      }
    }
  | {
      type: 'set-repo-open-status-true'
      payload: {
        owner: string
        repo: string
      }
    }

const selectedPullsReducer = (
  state: TState,
  action: TSelectedPullActionType
) => {
  const { type, payload } = action

  switch (type) {
    case 'set-repos': {
      const existRepos = state.repos

      if (existRepos) {
        return {
          ...state,
          repos: payload.reposByInstallationId?.flatMap(
            ({ installationId, repos }) => {
              return repos.map((repo) => {
                const existRepo = existRepos.find(
                  (r) => r.owner === repo.owner.login && r.name === repo.name
                )

                if (existRepo) {
                  return {
                    installationId,
                    owner: repo.owner.login,
                    name: repo.name,
                    url: repo.html_url,
                    pulls: existRepo.pulls,
                    isRepoOpen: false
                  }
                }

                return {
                  installationId,
                  owner: repo.owner.login,
                  name: repo.name,
                  url: repo.html_url,
                  pulls: undefined,
                  isRepoOpen: false
                }
              })
            }
          )
        }
      }

      return {
        ...state,
        repos: payload.reposByInstallationId?.flatMap(
          ({ installationId, repos }) =>
            repos.map((repo) => ({
              installationId,
              owner: repo.owner.login,
              name: repo.name,
              url: repo.html_url,
              pulls: undefined,
              isRepoOpen: false
            }))
        )
      }
    }

    case 'set-pulls': {
      if (!state.repos) {
        throw new Error('There is no repos. This should not happen.')
      }

      const isTargetRepo = (repo: TRepo) =>
        repo.owner === payload.owner && repo.name === payload.repo
      const hasTargetRepo = state.repos.some((repo) => isTargetRepo(repo))

      if (!hasTargetRepo) {
        return state
      }

      return {
        ...state,
        repos: state.repos.map((repo) => {
          if (isTargetRepo(repo)) {
            return {
              ...repo,
              pulls: payload.pulls?.map((pull) => {
                if (!repo.pulls) {
                  return {
                    number: pull.number,
                    title: pull.title,
                    url: pull.html_url,
                    baseRef: pull.base.ref,
                    headRef: pull.head.ref,
                    checked: false,
                    user: {
                      login: pull.user?.login ?? ''
                    }
                  }
                }

                const existPull = repo.pulls.find(
                  (p) => p.number === pull.number
                )

                if (existPull) {
                  return {
                    number: pull.number,
                    title: pull.title,
                    url: pull.html_url,
                    baseRef: pull.base.ref,
                    headRef: pull.head.ref,
                    checked: existPull.checked,
                    user: {
                      login: pull.user?.login ?? ''
                    }
                  }
                }

                return {
                  number: pull.number,
                  title: pull.title,
                  url: pull.html_url,
                  baseRef: pull.base.ref,
                  headRef: pull.head.ref,
                  checked: false,
                  user: {
                    login: pull.user?.login ?? ''
                  }
                }
              })
            }
          }

          return repo
        })
      }
    }

    case 'toggle-pull-check-status': {
      if (!state.repos) {
        throw new Error('There is no repos. This should not happen.')
      }

      const isTargetRepo = (repo: TRepo) =>
        repo.owner === payload.owner && repo.name === payload.repo && repo.pulls
      const hasTargetRepo = state.repos.some((repo) => isTargetRepo(repo))

      if (!hasTargetRepo) {
        return state
      }

      return {
        ...state,
        repos: state.repos.map((repo) => {
          if (isTargetRepo(repo)) {
            const isTargetPull = (pull: TPull) =>
              pull.number === payload.pullNumber
            const hasTargetPull = repo.pulls!.some((pull) => isTargetPull(pull))

            if (!hasTargetPull) {
              return repo
            }

            return {
              ...repo,
              pulls: repo.pulls!.map((pull) => {
                if (isTargetPull(pull)) {
                  return {
                    ...pull,
                    checked: !pull.checked
                  }
                }

                return pull
              })
            }
          }

          return repo
        })
      }
    }

    case 'toggle-repo-check-status': {
      if (!state.repos) {
        throw new Error('There is no repos. This should not happen.')
      }

      const isTargetRepo = (repo: TRepo) =>
        repo.owner === payload.owner && repo.name === payload.repo && repo.pulls
      const hasTargetRepo = state.repos.some((repo) => isTargetRepo(repo))

      if (!hasTargetRepo) {
        return state
      }

      return {
        ...state,
        repos: state.repos.map((repo) => {
          if (isTargetRepo(repo)) {
            const isAllPullsChecked = repo.pulls!.every((pull) => pull.checked)

            return {
              ...repo,
              pulls: repo.pulls!.map((pull) => {
                return {
                  ...pull,
                  checked: !isAllPullsChecked
                }
              })
            }
          }

          return repo
        })
      }
    }

    case 'toggle-repo-open-status': {
      if (!state.repos) {
        throw new Error('There is no repos. This should not happen.')
      }

      const isTargetRepo = (repo: TRepo) =>
        repo.owner === payload.owner && repo.name === payload.repo
      const hasTargetRepo = state.repos.some((repo) => isTargetRepo(repo))

      if (!hasTargetRepo) {
        return state
      }

      return {
        ...state,
        repos: state.repos.map((repo) => {
          if (isTargetRepo(repo)) {
            return {
              ...repo,
              isRepoOpen: !repo.isRepoOpen
            }
          }

          return repo
        })
      }
    }

    case 'set-repo-open-status-true': {
      if (!state.repos) {
        throw new Error('There is no repos. This should not happen.')
      }

      const isTargetRepo = (repo: TRepo) =>
        repo.owner === payload.owner && repo.name === payload.repo
      const hasTargetRepo = state.repos.some((repo) => isTargetRepo(repo))

      if (!hasTargetRepo) {
        return state
      }

      return {
        ...state,
        repos: state.repos.map((repo) => {
          if (isTargetRepo(repo)) {
            return {
              ...repo,
              isRepoOpen: true
            }
          }

          return repo
        })
      }
    }

    default:
      throw new Error('Invalid action type')
  }
}

const SelectedPullsContext = createContext<TState>({ repos: undefined })

const SelectedPullsDispatchContext = createContext<
  Dispatch<TSelectedPullActionType> | undefined
>(undefined)

interface ISelectedPullsProviderProps {
  children: ReactNode
}

export const SelectedPullsProvider = ({
  children
}: ISelectedPullsProviderProps) => {
  const [{ repos }, dispatch] = useReducer(selectedPullsReducer, {
    repos: undefined
  })

  return (
    <SelectedPullsContext.Provider value={{ repos }}>
      <SelectedPullsDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedPullsDispatchContext.Provider>
    </SelectedPullsContext.Provider>
  )
}

export const useRepos = () => {
  const state = useContext(SelectedPullsContext)

  if (!state) {
    throw new Error('useRepos must be used within a SelectedPullsProvider')
  }

  const { repos } = state

  return { repos }
}

export const useRepoStatus = (owner: string, repo: string) => {
  const state = useContext(SelectedPullsContext)

  if (!state) {
    throw new Error(
      'useRepoCheckedStatus must be used within a SelectedPullsProvider'
    )
  }

  const { repos } = state

  if (!repos) {
    throw new Error('There is no repos. This should not happen.')
  }

  const targetRepo = repos.find(
    (pull) => pull.owner === owner && pull.name === repo
  )

  if (!targetRepo) {
    throw new Error('There is no target repo. This should not happen.')
  }

  if (!targetRepo.pulls) {
    return { checked: false, disabled: true }
  }

  if (targetRepo.pulls.length === 0) {
    return { checked: false, disabled: true }
  }

  const isAllPullsChecked = targetRepo.pulls.every((pull) => pull.checked)

  return { checked: isAllPullsChecked, disabled: false }
}

export const useUpdateRepoOrPull = () => {
  const dispatch = useContext(SelectedPullsDispatchContext)

  if (!dispatch) {
    throw new Error(
      'useUpdateSelectedPulls must be used within a SelectedReposProvider'
    )
  }

  return {
    setRepos: (
      reposByInstallationId:
        | {
            installationId: number
            repos: InstallationRepositoriesResponse['repositories']
          }[]
        | undefined
    ) => {
      dispatch({ type: 'set-repos', payload: { reposByInstallationId } })
    },
    setPulls: (
      owner: string,
      repo: string,
      pulls: RepoPullsResponse | undefined
    ) => {
      dispatch({ type: 'set-pulls', payload: { owner, repo, pulls } })
    },
    togglePullCheckStatus: (
      owner: string,
      repo: string,
      pullNumber: number
    ) => {
      dispatch({
        type: 'toggle-pull-check-status',
        payload: { owner, repo, pullNumber }
      })
    },
    toggleRepoCheckStatus: (owner: string, repo: string) => {
      dispatch({ type: 'toggle-repo-check-status', payload: { owner, repo } })
    },

    toggleRepoOpenStatus: (owner: string, repo: string) => {
      dispatch({ type: 'toggle-repo-open-status', payload: { owner, repo } })
    },

    setRepoOpenStatusTrue: (owner: string, repo: string) => {
      dispatch({ type: 'set-repo-open-status-true', payload: { owner, repo } })
    }
  }
}
