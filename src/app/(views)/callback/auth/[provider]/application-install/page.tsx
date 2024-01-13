'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { CallbackLoading } from '@/components/root/callback-loading/callback-loading'

import type { TCallbackApplicationInstall } from '@/types/github/root/index'

export default function Page() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const installationId = searchParams.get('installation_id')
    const setupAction = searchParams.get('setup_action')
    const message: TCallbackApplicationInstall = { installationId, setupAction }

    if (window.opener) {
      ;(window.opener as Window).postMessage(message)
      window.close()
    }
  }, [])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <CallbackLoading />
    </div>
  )
}
