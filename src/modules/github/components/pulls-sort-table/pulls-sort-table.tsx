import type { TRepo } from 'src/modules/github/types'

import { Table } from '@/elements/root/table/table'

interface IPullsSortTable {
  repos: TRepo[] | undefined
}

export const PullsSortTable = ({ repos }: IPullsSortTable) => {
  if (!repos) {
    return null
  }
  const cells = repos.flatMap((repo) =>
    repo.pulls!.map((pull) => ({
      key: `row-${repo.name}-${pull.number}`,
      items: [
        {
          key: `cell-${repo.name}`,
          children: repo.name
        },
        {
          key: `cell-${pull.number}`,
          children: pull.title
        }
      ]
    }))
  )

  return (
    <div>
      <Table
        headers={[
          {
            key: 'header',
            items: [
              {
                key: 'header-cell-0',
                children: 'Repository'
              },
              {
                key: 'header-cell-1',
                children: 'Pull request'
              }
            ]
          }
        ]}
        cells={cells}
      />
    </div>
  )
}
