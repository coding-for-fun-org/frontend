'use client'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import type { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ToastProvider } from '@/elements/root/toast/toast-provider'

interface ClientProviderProps {
  children: ReactNode
}

export const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ToastProvider>
    </QueryClientProvider>
  )
}
