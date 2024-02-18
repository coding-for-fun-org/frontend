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
    _base() {
      return ['GITHUB'] as const
    },
    _installations() {
      return ['INSTALLATIONS'] as const
    },
    _installation(installationId: number) {
      return [...this._installations(), installationId] as const
    },
    _repos() {
      return ['REPOS'] as const
    },
    _repo(owner: string, repo: string) {
      return [...this._repos(), owner, repo] as const
    },
    _pulls() {
      return ['PULLS'] as const
    },
    _pullByNumber(number: number) {
      return [...this._pulls(), 'NUMBER', number] as const
    },
    _pullByRef(ref: string) {
      return [...this._pulls(), 'REF', ref] as const
    },
    _commits() {
      return ['COMMITS'] as const
    },
    _commitBySha(sha: string) {
      return [...this._commits(), sha] as const
    },
    _checkRuns() {
      return ['CHECK-RUNS'] as const
    },
    _requiredStatusChecks() {
      return ['REQUIRED-STATUS-CHECKS'] as const
    },
    currentUser() {
      return [...this._base(), 'CURRENT-USER'] as const
    },
    installations() {
      return [...this._base(), ...this._installations()] as const
    },
    installation(installationId: number) {
      return [...this._base(), ...this._installation(installationId)] as const
    },
    installationRepos(installationId: number) {
      return [
        ...this._base(),
        ...this._installation(installationId),
        ...this._repos()
      ] as const
    },
    branchRequiredStatusChecks(
      installationId: number,
      owner: string,
      repo: string,
      pullRef: string
    ) {
      return [
        ...this._base(),
        ...this._installation(installationId),
        ...this._repo(owner, repo),
        ...this._pullByRef(pullRef),
        ...this._requiredStatusChecks()
      ] as const
    },
    repo(owner: string, repo: string) {
      return [...this._base(), this._repo(owner, repo)] as const
    },
    repoPulls(owner: string, repo: string) {
      return [
        ...this._base(),
        ...this._repo(owner, repo),
        ...this._pulls()
      ] as const
    },
    repoPull(owner: string, repo: string, pullNumber: number) {
      return [
        ...this._base(),
        ...this._repo(owner, repo),
        ...this._pullByNumber(pullNumber)
      ] as const
    },
    repoPullCommits(owner: string, repo: string, pullNumber: number) {
      return [
        ...this._base(),
        ...this._repo(owner, repo),
        ...this._pullByNumber(pullNumber),
        ...this._commits()
      ] as const
    },
    repoPullCommit(
      owner: string,
      repo: string,
      pullNumber: number,
      commitSha: string
    ) {
      return [
        ...this._base(),
        ...this.repoPull(owner, repo, pullNumber),
        ...this._commitBySha(commitSha)
      ] as const
    },
    repoPullCommitCheckRuns(
      owner: string,
      repo: string,
      pullNumber: number,
      commitSha: string
    ) {
      return [
        ...this._base(),
        ...this.repoPull(owner, repo, pullNumber),
        ...this._commitBySha(commitSha),
        ...this._checkRuns()
      ] as const
    },
    repoPullStatus(owner: string, repo: string, pullNumber: number) {
      return [
        ...this._base(),
        ...this.repoPull(owner, repo, pullNumber),
        'STATUS'
      ] as const
    }
  }
}
