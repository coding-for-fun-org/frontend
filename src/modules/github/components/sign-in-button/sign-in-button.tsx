'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { type FC, useState } from 'react'

import { Alert } from '@/elements/root/alert/alert'
import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { authService } from '@/services/root/auth'

import { EAuthErrorReason } from '@/types/root/index'

import { EProviders } from '@/types/github/root/server'

export const SignInButton: FC = () => {
  const router = useRouter()
  const { translate } = useDictionary()
  const searchParams = useSearchParams()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const isRefreshTokenExpired =
    searchParams.get('reason') === EAuthErrorReason.REFRESH_TOKEN_EXPIRED

  const signIn = async () => {
    setIsSigningIn(true)

    authService
      .signIn(EProviders.GITHUB)
      .then(({ url }) => {
        router.push(url)
      })
      .catch((error) => {
        setIsSigningIn(false)

        console.error(error)
      })
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        label={translate('AUTH.SIGN_IN_WITH_GITHUB')}
        icon={<GitHubLogoIcon className="w-full h-full" />}
        loading={isSigningIn}
        onClick={() => {
          signIn().catch(console.error)
        }}
      />

      {isRefreshTokenExpired && (
        <div className="absolute w-full top-0 z-10 p-5">
          <Alert
            title={translate('AUTH.SESSION_EXPIRED_ALERT_TITLE')}
            description={translate('AUTH.SESSION_EXPIRED_ALERT_DESCRIPTION')}
            variant="error"
            className="w-full"
          />
        </div>
      )}
    </>
  )
}
