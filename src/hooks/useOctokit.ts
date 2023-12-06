import { Octokit } from '@octokit/core'
import { useSession } from 'next-auth/react'

export const useOctokit = () => {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return new Octokit({ auth: session.accessToken })
}
