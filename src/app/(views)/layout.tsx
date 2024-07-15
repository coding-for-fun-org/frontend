import { type Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

import '@/styles/root/index.scss'

import { getDictionary } from '@/dictionaries/root/index'

import { Header } from '@/components/root/header/header'

import { ClientProvider } from '@/contexts/root/client-provider/client-provider'
import { DictionaryProvider } from '@/contexts/root/dictionary-provider/dictionary-provider'
import { ThemeProvider } from '@/contexts/root/theme-provider/theme-provider'

import { getLanguage } from '@/utils/root/language.server'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: '400',
  display: 'swap'
})

export const metadata = {
  title: 'Coding For Fun',
  description: 'My personal playground for coding and learning.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default async function Layout({ children }: { children: ReactNode }) {
  const language = await getLanguage()
  const dictionary = await getDictionary(language)

  return (
    <html lang={language}>
      <body
        className={`flex flex-col min-h-screen ${notoSans.className}`}
        // suppressHydrationWarning={true} is used to prevent a warning from ThemeProvider
        // this is not an ideal solution, but it works for now
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ClientProvider>
            <DictionaryProvider dictionary={dictionary}>
              <Header language={language} />
              <main className="relative container bg-background h-[calc(100vh-theme(space.14)-1px)] py-4">
                {children}
              </main>
            </DictionaryProvider>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
