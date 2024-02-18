import { type ReactNode } from 'react'

import { IndexTabs } from '@/components/github/root/index-tabs/index-tabs'

export default async function Layout({ children }: { children: ReactNode }) {
  return <IndexTabs />
}
