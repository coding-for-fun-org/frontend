'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode } from 'react'

import { Tabs } from '@/elements/root/tabs/tabs'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

import { SelectedPullsProvider } from '@/contexts/github/root/selected-pulls-provider'

enum ETabValue {
  CONNECTIONS = 'CONNECTIONS',
  PULLS = 'PULLS'
}

const getValue = (pathname: string): ETabValue => {
  switch (pathname) {
    case urlService.github.connections(): {
      return ETabValue.CONNECTIONS
    }

    case urlService.github.pulls(): {
      return ETabValue.PULLS
    }
  }

  throw new Error('Invalid pathname')
}

export default function Layout({
  children,
  pullButtons
}: {
  children: ReactNode
  pullButtons: React.ReactNode
}) {
  const { translate } = useDictionary()
  const pathname = usePathname()
  const router = useRouter()
  const value = getValue(pathname)
  const tabValues = [
    {
      label: translate('GITHUB.TAB_CONNECTIONS_LABEL'),
      value: ETabValue.CONNECTIONS,
      children: children
    },
    {
      label: translate('GITHUB.TAB_BULK_PULL_REVIEWS_LABEL'),
      value: ETabValue.PULLS,
      children: children,
      actions: pullButtons
    }
  ]

  const handleValueChange = (value: string) => {
    switch (value as ETabValue) {
      case ETabValue.CONNECTIONS: {
        router.replace(urlService.github.connections())

        break
      }

      case ETabValue.PULLS: {
        router.replace(urlService.github.pulls())

        break
      }
    }
  }

  return (
    <SelectedPullsProvider>
      <Tabs
        className="h-full"
        value={value}
        onValueChange={handleValueChange}
        values={tabValues}
      />
    </SelectedPullsProvider>
  )
}
