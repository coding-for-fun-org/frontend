'use client'

import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

import { ThemeProvider } from '@/contexts/root/ThemeProvider'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider isDarkMode={true}>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
