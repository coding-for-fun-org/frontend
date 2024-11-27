import type { TRepo } from 'src/modules/github/types'

import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Table } from '@/elements/root/table/table'

interface IPullsSortTable {
  repos: TRepo[] | undefined
}

export const PullsSortTable = ({ repos }: IPullsSortTable) => {
  const handleCheckedChange = () => {
    console.log(handleCheckedChange)
  }

  if (!repos) {
    return null
  }
  const cells = repos.flatMap((repo) =>
    repo.pulls!.map((pull) => ({
      key: `row-${repo.name}-${pull.number}`,
      items: [
        {
          key: `cell-checkbox-${pull.number}`,
          children: (
            <Checkbox checked={false} onCheckedChange={handleCheckedChange} />
          )
        },
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
                className: 'w-3 content-start',
                key: 'header-cell-0'
              },
              {
                key: 'header-cell-1',
                children: 'Repository'
              },
              {
                key: 'header-cell-2',
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
