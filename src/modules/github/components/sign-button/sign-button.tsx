'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider'

import type {
  TCsrfTokenResponse,
  TSignInResponse
} from '@/types/github/root/server'

export const SignButton: FC = () => {
  const router = useRouter()
  const { dictionary } = useDictionary()
  const signIn = async () => {
    axios
      .get<TCsrfTokenResponse>('/api/auth/csrf')
      .then((response) => response.data)
      .then(({ csrfToken }) =>
        axios.get<TSignInResponse>(
          '/api/auth/signin/github?csrf_token=' + csrfToken
        )
      )
      .then((response) => response.data)
      .then(({ url }) => {
        router.push(url)
      })
      .catch(console.error)
  }

  return (
    <Button
      type="button"
      onClick={() => {
        signIn().catch(console.error)
      }}
    >
      {dictionary.AUTH.SIGN_IN}
    </Button>
  )
}
