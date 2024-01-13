'use client'

import { type FC, useState } from 'react'

import { Tabs } from '@/elements/root/tabs/tabs'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { BulkPullReviews } from '@/components/github/root/bulk-pull-reviews/bulk-pull-reviews'
import { Connections } from '@/components/github/root/connections/connections'

enum ETabValue {
  CONNECTIONS = 'CONNECTIONS',
  BULK_PULL_REVIEWS = 'BULK-PULL-REVIEWS'
}

export const IndexTabs: FC = () => {
  const { translate } = useDictionary()
  const [value, setValue] = useState<ETabValue>(ETabValue.BULK_PULL_REVIEWS)
  const tabValues = [
    {
      label: translate('GITHUB.TAB_CONNECTIONS_LABEL'),
      value: ETabValue.CONNECTIONS,
      children: <Connections />
    },
    {
      label: translate('GITHUB.TAB_BULK_PULL_REVIEWS_LABEL'),
      value: ETabValue.BULK_PULL_REVIEWS,
      children: <BulkPullReviews />
    }
  ]

  const handleValueChange = (value: string) => {
    setValue(value as ETabValue)
  }

  return (
    <Tabs
      className="h-full"
      value={value}
      onValueChange={handleValueChange}
      values={tabValues}
    />
  )
}
