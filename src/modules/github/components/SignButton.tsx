'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import type { FC } from 'react'

import { ESessionStatus } from '@/types/root/index'

export const SignButton: FC = () => {
  const { status } = useSession()

  if (status === ESessionStatus.LOADING) {
    return <div>loading...</div>
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
        log out
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
      log in
    </button>
  )
}
