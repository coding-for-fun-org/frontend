export interface ICheckedPull {
  org: string
  repo: string
  pullTitle: string
  pullNumber: number
  user: {
    login: string | undefined
  }
}
