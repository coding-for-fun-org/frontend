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
  const router = useRouter()
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
      children: (
        <SelectedPullsProvider>
          <BulkPullReviews />
        </SelectedPullsProvider>
      )
    }
  ]

  const handleValueChange = (value: string) => {
    setValue(value as ETabValue)
    if (value === 'CONNECTIONS') {
      router.replace(urlService.github.connections())
    } else {
      router.replace(urlService.github.pulls())
    }
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
