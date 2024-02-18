'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

import { ELocalStorageKey } from '@/types/root/index'

export default function Page() {
  const { translate } = useDictionary()
  const [bulkPullReviewPathname, setBulkPullReviewPathname] =
    useState<string>('')

  useEffect(() => {
    const hasGithubAccessToken = Boolean(
      localStorage.getItem(ELocalStorageKey.AUTH_GITHUB_ACCESS_TOKEN)
    )

    setBulkPullReviewPathname(
      hasGithubAccessToken
        ? urlService.github.pulls()
        : urlService.github.signIn()
    )
  }, [])

  return (
    <div className="mt-5 flex flex-col gap-12">
      <h1>{translate('COMMON.APP_NAME')}</h1>
      <h3>{translate('ROOT_PAGE.APP_DESCRIPTION')}</h3>

      <div className="flex flex-col gap-4">
        <h4>{translate('ROOT_PAGE.PLAYGROUND_LIST_TITLE')}</h4>

        <div className="flex flex-row gap-4">
          <Link href={bulkPullReviewPathname}>
            <Button
              label={translate(
                'ROOT_PAGE.PLAYGROUND_LIST_ITEM_GITHUB_BULK_PULL_REVIEW'
              )}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
