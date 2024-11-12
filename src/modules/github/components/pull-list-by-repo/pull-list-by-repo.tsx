import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

import { Alert } from '@/elements/root/alert/alert'
import { Button } from '@/elements/root/button/button'
import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Skeleton } from '@/elements/root/skeleton/skeleton'
import { Table } from '@/elements/root/table/table'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullListItem } from '@/components/github/root/pull-list-item/pull-list-item'

import { useUpdateRepoOrPull } from '@/contexts/github/root/selected-pulls-provider'

import type { TPull } from '@/types/github/root/index'

import { useFetchPulls } from './hooks'

interface PullListByRepoProps {
  installationId: number
  owner: string
  repo: string
  repoUrl: string
  pulls: TPull[] | undefined
  isRepoOpen: boolean
}

export const PullListByRepo = ({
  installationId,
  owner,
  repo,
  repoUrl,
  pulls,
  isRepoOpen
}: PullListByRepoProps) => {
  const { translate } = useDictionary()
  const { toggleRepoCheckStatus, togglePullCheckStatus, toggleRepoOpenStatus } =
    useUpdateRepoOrPull()
  // TODO: handle error case
  const { isPending, isLoading } = useFetchPulls(owner, repo, isRepoOpen)
  const hasChild = !!pulls && pulls.length > 0
  const isRepoChecked = !!pulls
    ? pulls.length > 0 && pulls.every((pull) => pull.checked)
    : false

  const handleRepoClick = () => {
    toggleRepoOpenStatus(owner, repo)
  }

  return (
    <li className="list-none">
      <div className="flex gap-2 items-center">
        <Checkbox
          checked={isRepoChecked}
          onCheckedChange={() => {
            toggleRepoCheckStatus(owner, repo)
          }}
          disabled={isPending || isLoading || !hasChild}
        />
        <Link
          href={repoUrl}
          target="_blank"
          className="underline-offset-4 hover:underline"
        >
          <span>{repo}</span>
        </Link>

        <Button
          role="button"
          variant="ghost"
          size="icon"
          className="!w-4 !h-4 hover:!bg-transparent"
          onClick={handleRepoClick}
        >
          {isRepoOpen ? (
            <ChevronDownIcon className="w-full h-full" />
          ) : (
            <ChevronRightIcon className="w-full h-full" />
          )}
        </Button>
      </div>

      {isRepoOpen && (
        <ul className="flex flex-col gap-2 mt-2 ml-4">
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="w-1/2">
                <Skeleton variant="rect" />
              </li>
            ))}

          {!isLoading && !!pulls && (
            <Table
              headers={[
                {
                  key: 'header',
                  items: [
                    {
                      key: 'header-cell-0',
                      children: 'PH'
                    }
                  ]
                }
              ]}
              cells={pulls.map((pull) => ({
                key: `${pull.number}`,
                items: [
                  {
                    key: `${pull.number}-cell-0`,
                    className: 'w-3',
                    children: 'PC'
                  },
                  {
                    key: `${pull.number}-cell-1`,
                    children: (
                      <PullListItem
                        installationId={installationId}
                        owner={owner}
                        repo={repo}
                        pull={pull}
                        handlePullCheckChange={() => {
                          togglePullCheckStatus(owner, repo, pull.number)
                        }}
                      />
                    )
                  }
                ]
              }))}
            />
          )}
        </ul>
      )}

      {isRepoOpen && pulls && pulls.length === 0 && (
        <Alert
          variant="info"
          title={translate('COMMON.ALERT_NO_DATA_TITLE')}
          description={translate('COMMON.ALERT_NO_DATA_DESCRIPTION')}
        />
      )}
    </li>
  )
}
