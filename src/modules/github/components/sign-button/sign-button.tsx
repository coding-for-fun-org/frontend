'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { type FC } from 'react'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { ESessionStatus } from '@/types/root/index'

export const SignButton: FC = () => {
  const { status } = useSession()
  const { dictionary } = useDictionary()

  if (status === ESessionStatus.LOADING) {
    return <div>{dictionary.AUTH.LOADING}</div>
  }

  if (status === ESessionStatus.AUTHENTICATED) {
    return (
      <Button
        type="button"
        onClick={() => {
          signOut({ callbackUrl: '/github' }).catch(console.error)
        }}
      >
        {dictionary.AUTH.SIGN_OUT}
      </Button>
    )
  }

  // status === ESessionStatus.UNAUTHENTICATED
  return (
    <Button
      type="button"
      onClick={() => {
        signIn('github', { callbackUrl: '/github' }).catch(console.error)
      }}
    >
      {dictionary.AUTH.SIGN_IN}
    </Button>
  )
}
