import { Octokit } from '@octokit/core'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

export const useOctokit = () => {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return useMemo(
    () => new Octokit({ auth: session.accessToken }),
    [session.accessToken]
  )
}
