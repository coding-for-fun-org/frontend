import type { ReactNode } from 'react'

import { Header } from '@/components/root/header/header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <main className="container top-14">{children}</main>
    </>
  )
}
