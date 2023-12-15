'use client'

import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { FC, ReactNode } from 'react'

interface ClientProviderProps {
  children: ReactNode
  session: Session | null
}

export const ClientProvider: FC<ClientProviderProps> = ({
  children,
  session
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
