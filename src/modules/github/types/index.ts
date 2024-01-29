export type TCallbackApplicationInstall = {
  installationId: string | null
  setupAction: string | null
}

export type TGithubPullRequest = {
  state: string
  number: number
  title: string
  pullUrl: string
  user: {
    login: string | undefined
    avatarUrl: string | undefined
  }
}

export type TGithubPullRequestGroup = {
  org: string
  repo: string
  repoUrl: string
  pulls: TGithubPullRequest[]
}

export type TGithubInstallation = {
  id: number
  owner: string
  pageUrl: string
  avatarUrl: string
}

export enum EPullRequestType {
  'REQUEST_CHANGES' = 'REQUEST_CHANGES',
  'APPROVE' = 'APPROVE',
  'COMMENT' = 'COMMENT'
}

export type TRepoHasCheck = {
  org: string
  repo: string
  repoUrl: string
  pulls: TPull[]
}

export type TPull = {
  number: number
  title: string
  pullUrl: string
  isChecked: boolean
  user: {
    login: string | undefined
  }
}
