'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import type { FC } from 'react'

import { useDictionary } from '@/contexts/root/DictionaryProvider'

import { ESessionStatus } from '@/types/root/index'

export const SignButton: FC = () => {
  const { status } = useSession()
  const { dictionary } = useDictionary()

  if (status === ESessionStatus.LOADING) {
    return <div>{dictionary.AUTH.LOADING}</div>
  }

  const buttonClassNames =
    'bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'

  if (status === ESessionStatus.AUTHENTICATED) {
    return (
      <button
        type="button"
        className={buttonClassNames}
        onClick={() => {
          signOut({ callbackUrl: '/github' }).catch(console.error)
        }}
      >
        {dictionary.AUTH.SIGN_OUT}
      </button>
    )
  }

  // status === ESessionStatus.UNAUTHENTICATED
  return (
    <button
      type="button"
      className={buttonClassNames}
      onClick={() => {
        signIn('github', { callbackUrl: '/github' }).catch(console.error)
      }}
    >
      {dictionary.AUTH.SIGN_IN}
    </button>
  )
}
