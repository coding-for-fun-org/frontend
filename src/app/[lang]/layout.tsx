import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import '@/styles/root/index.css'

import { getDictionary } from '@/dictionaries/root/index'

import { getServerAuthSession } from '@/server/root/auth'

import { ClientProvider } from '@/contexts/root/client-provider/client-provider'
import { DictionaryProvider } from '@/contexts/root/dictionary-provider/dictionary-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

export async function generateStaticParams() {
  return [{ lang: 'en' }]
}

export const metadata = {
  title: 'Coding For Fun',
  description: 'My personal playground for coding and learning.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default async function Layout({
  children,
  params
}: {
  children: ReactNode
  params: { lang: 'en' }
}) {
  const session = await getServerAuthSession()
  const dictionary = await getDictionary(params.lang)

  return (
    // suppressHydrationWarning={true} is used to prevent a warning from ThemeProvider
    // this is not an ideal solution, but it works for now
    <html lang={params.lang}>
      <body className={`min-h-screen font-sans ${inter.variable}`}>
        <ClientProvider session={session}>
          <DictionaryProvider dictionary={dictionary}>
            {children}
          </DictionaryProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
