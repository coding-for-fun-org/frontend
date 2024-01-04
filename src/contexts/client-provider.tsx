'use client'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import type { FC, ReactNode } from 'react'

import { ToastProvider } from '@/elements/root/toast/toast-provider'

interface ClientProviderProps {
  children: ReactNode
}

export const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  return (
    <ToastProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ToastProvider>
  )
}
