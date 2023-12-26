'use client'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { FC, ReactNode } from 'react'

import { ToastProvider } from '@/elements/root/toast/toast-provider'

interface ClientProviderProps {
  children: ReactNode
  session: Session | null
}

export const ClientProvider: FC<ClientProviderProps> = ({
  children,
  session
}) => {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ToastProvider>
    </SessionProvider>
  )
}
