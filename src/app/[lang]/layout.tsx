import { getDictionary } from '@/dictionaries/root/index'
import { Inter } from 'next/font/google'

import '@/styles/root/index.css'

import { getServerAuthSession } from '@/server/root/auth'

import { ClientProvider } from '@/contexts/root/ClientProvider'
import { DictionaryProvider } from '@/contexts/root/DictionaryProvider'

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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: 'en' }
}) {
  const session = await getServerAuthSession()
  const dictionary = await getDictionary(params.lang)

  return (
    <html lang={params.lang}>
      <body className={`font-sans ${inter.variable}`}>
        <ClientProvider session={session}>
          <DictionaryProvider dictionary={dictionary}>
            {children}
          </DictionaryProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
