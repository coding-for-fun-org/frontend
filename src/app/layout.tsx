import { Inter } from 'next/font/google'

import '@/styles/root/index.css'

import { getServerAuthSession } from '@/server/root/auth'

import { ClientProvider } from '@/contexts/root/ClientProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata = {
  title: 'Coding For Fun',
  description: 'My personal playground for coding and learning.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerAuthSession()

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ClientProvider session={session}>{children}</ClientProvider>
      </body>
    </html>
  )
}
