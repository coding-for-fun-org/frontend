'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { ELocalStorageKey } from '@/types/root/index'

import {
  EProviders,
  type TAccessTokenResponse
} from '@/types/github/root/server'

export default function Page({ params }: { params: { provider: EProviders } }) {
  const { provider } = params
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    switch (provider) {
      case EProviders.GITHUB: {
        const code = searchParams.get('code')
        const previousUrl = searchParams.get('previous_url')

        axios
          .get<TAccessTokenResponse>(
            `/api/auth/access_token/${provider}?code=${code}`
          )
          .then((response) => response.data)
          .then(({ accessToken }) => {
            localStorage.setItem(
              ELocalStorageKey.AUTH_ACCESS_TOKEN,
              accessToken
            )

            router.push(previousUrl ?? '/github')
          })
          .catch(console.error)

        break
      }
    }
  }, [])

  return <div>loading...</div>
}
