import type { ReactNode } from 'react'

import { ThemeProvider } from '@/contexts/root/theme-provider'

export const metadata = {
  title: 'Callback'
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
