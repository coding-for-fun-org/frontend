import type { TRepo } from 'src/modules/github/types'

interface IPullsSortTable {
  repos: TRepo[] | undefined
}

export const PullsSortTable = ({ repos }: IPullsSortTable) => {
  console.log(repos)
  return (
    <div>
      <h1>PullsSortTable</h1>
    </div>
  )
}
