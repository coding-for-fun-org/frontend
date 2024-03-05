export type TCallbackApplicationInstall = {
  installationId: string | null
  setupAction: string | null
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

export type TPull = {
  number: number
  title: string
  url: string
  baseRef: string
  headRef: string
  checked: boolean
  user: {
    login: string | undefined
  }
}

export type TRepo = {
  installationId: number
  owner: string
  name: string
  url: string
  pulls: TPull[] | undefined
  isOpen: boolean
}
