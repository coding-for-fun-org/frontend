export type TCallbackApplicationInstall = {
  installationId: string | null
  setupAction: string | null
}

export type TGithubPullRequest = {
  state: string
  number: number
  title: string
  user: {
    login: string | undefined
    avatarUrl: string | undefined
  }
}

export type TGithubPullRequestGroup = {
  org: string
  repo: string
  pulls: TGithubPullRequest[]
}

export enum EPullRequestType {
  'REQUEST_CHANGES' = 'REQUEST_CHANGES',
  'APPROVE' = 'APPROVE',
  'COMMENT' = 'COMMENT'
}

export type TRepoHasCheck = {
  org: string
  repo: string
  pulls: TPull[]
}

export type TPull = {
  number: number
  title: string
  isChecked: boolean
  user: {
    login: string | undefined
  }
}
