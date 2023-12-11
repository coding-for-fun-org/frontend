'use client'

import type { FC } from 'react'

import { usePrsGroup } from '@/hooks/github/root/usePrsGroup'

export const BulkMergePrs: FC = () => {
  const { prsGroup } = usePrsGroup()

  return (
    <div>
      {(prsGroup ?? []).map((group) => (
        <div key={`${group.org}-${group.repo}`}>
          <h1 className="text-xl font-semibold">
            {group.org} / {group.repo}
          </h1>

          <ol className="list-decimal ml-4 pl-10">
            {group.pulls.map((pull) => (
              <li key={pull.number}>{pull.title}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  )
}
