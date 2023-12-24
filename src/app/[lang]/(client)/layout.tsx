'use client'

import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

import { ToastProvider } from '@/elements/root/toast/toast-provider'

import { ThemeProvider } from '@/contexts/root/theme-provider'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider isDarkMode={true}>
      <ToastProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
