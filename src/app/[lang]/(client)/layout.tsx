'use client'

import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

import { ToastProvider } from '@/elements/root/toast/toast-provider'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ToastProvider>
  )
}
