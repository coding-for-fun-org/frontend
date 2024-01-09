'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { CallbackLoading } from '@/components/root/callback-loading/callback-loading'

import { authService } from '@/services/root/auth'
import { urlService } from '@/services/root/url'

import { ELocalStorageKey } from '@/types/root/index'

import { EProviders } from '@/types/github/root/server'

export default function Page({ params }: { params: { provider: EProviders } }) {
  const { provider } = params
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    switch (provider) {
      case EProviders.GITHUB: {
        const code = searchParams.get('code')

        if (!code) {
          break
        }

        authService
          .issueAccessToken(EProviders.GITHUB, { code })
          .then(({ accessToken }) => {
            localStorage.setItem(
              ELocalStorageKey.AUTH_GITHUB_ACCESS_TOKEN,
              accessToken
            )

            router.push(urlService.github.bulkReviews())
          })
          .catch(console.error)

        break
      }
    }
  }, [])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <CallbackLoading />
    </div>
  )
}
