export interface ICheckedPull {
  owner: string
  repo: string
  pullTitle: string
  pullNumber: number
  user: {
    login: string | undefined
  }
}
