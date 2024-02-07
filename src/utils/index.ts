export const createIdGenerator = (initialNumber?: number) => {
  let currentId = (initialNumber ?? 0) - 1

  return () => {
    const nextId = currentId === Number.MAX_SAFE_INTEGER - 1 ? 0 : currentId + 1

    currentId = nextId

    return nextId
  }
}

export const isServer = () => typeof window === 'undefined'

// Web compatible method to create a hash, using SHA256
export const createHash = async (message: string): Promise<string> => {
  const data = new TextEncoder().encode(message)
  const hash = await crypto.subtle.digest('SHA-256', data)

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .toString()
}

// Web compatible method to create a random string of a given length
export const createRandomString = (size: number): string => {
  const byte2hex = (byte: number) => ('0' + byte.toString(16)).slice(-2)
  const bytes = crypto.getRandomValues(new Uint8Array(size))

  return Array.from(bytes).reduce<string>(
    (accumulator, byte) => accumulator + byte2hex(byte),
    ''
  )
}

export const queryKey = {
  github: {
    installations: () => ['GITHUB-INSTALLATIONS'] as const,
    installationRepositories: (installationId: number) =>
      ['GITHUB-INSTALLATION-REPOSITORIES', installationId] as const,
    repositoryPullRequests: (owner: string, repo: string) =>
      ['GITHUB-REPOSITORY-PULLREQUESTS', owner, repo] as const,
    currentUser: () => ['GITHUB-CURRENT-USER'] as const,
    pullsGroup: () => ['GITHUB-PULLS-GROUP'] as const,
    pullStatus: (owner: string, repo: string, pullNumber: number) =>
      ['GITHUB-PULL-STATUS', owner, repo, pullNumber] as const
  }
}
