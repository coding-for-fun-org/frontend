'use client'

import { Tabs } from '@/elements/root/tabs/tabs'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { BulkPullReviews } from '@/components/github/root/bulk-pull-reviews/bulk-pull-reviews'
import { GrantPermissionButton } from '@/components/github/root/grant-permission-button/grant-permission-button'

enum ETabValue {
  GRANT_PERMISSION = 'GRANT-PERMISSION',
  BULK_PULL_REVIEWS = 'BULK-PULL-REVIEWS'
}

export default function Page() {
  const { translate } = useDictionary()

  const tabValues = [
    {
      label: translate('GITHUB.TAB_GRANT_PERMISSION_LABEL'),
      value: ETabValue.GRANT_PERMISSION,
      children: <GrantPermissionButton />
    },
    {
      label: translate('GITHUB.TAB_BULK_PULL_REVIEWS_LABEL'),
      value: ETabValue.BULK_PULL_REVIEWS,
      children: <BulkPullReviews />
    }
  ]

  return (
    <Tabs
      className="h-full"
      defaultValue={ETabValue.BULK_PULL_REVIEWS}
      values={tabValues}
    />
  )
}
