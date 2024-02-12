'use client'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FC, ReactNode } from 'react'

import { ToastProvider } from '@/elements/root/toast/toast-provider'

interface ClientProviderProps {
  children: ReactNode
}

export const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 // 1 minute
      }
    }
    /**
     * TODO: handle 401 error here instead of axios
     */
    // queryCache: new QueryCache({
    //   onError: (error, query) => {
    //     //
    //   }
    // })
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ToastProvider>
    </QueryClientProvider>
  )
}
