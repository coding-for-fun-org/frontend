'use client'

import { useRouter } from 'next/navigation'
import { type FC, useState } from 'react'

import { Tabs } from '@/elements/root/tabs/tabs'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

import { BulkPullReviews } from '@/components/github/root/bulk-pull-reviews/bulk-pull-reviews'
import { Connections } from '@/components/github/root/connections/connections'

import { SelectedPullsProvider } from '@/contexts/github/root/selected-pulls-provider'

enum ETabValue {
  CONNECTIONS = 'CONNECTIONS',
  BULK_PULL_REVIEWS = 'BULK-PULL-REVIEWS'
}

export const IndexTabs: FC = () => {
  const { translate } = useDictionary()
  const router = useRouter()
  const [value, setValue] = useState<ETabValue>(ETabValue.BULK_PULL_REVIEWS)
  const tabValues = [
    {
      label: translate('GITHUB.TAB_CONNECTIONS_LABEL'),
      value: ETabValue.CONNECTIONS,
      children: router.push(urlService.github.connections())
    },
    {
      label: translate('GITHUB.TAB_BULK_PULL_REVIEWS_LABEL'),
      value: ETabValue.BULK_PULL_REVIEWS,
      children: router.push(urlService.github.index())
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
