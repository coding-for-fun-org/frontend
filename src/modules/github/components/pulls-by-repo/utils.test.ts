import type { TRepo } from 'src/modules/github/types'

import { checkIfAllReposChecked } from './utils'

describe('checkIfAllReposChecked', () => {
  const mockRepos: TRepo[] = [
    {
      installationId: 1,
      owner: 'owner1',
      name: 'repo1',
      url: 'https://github.com/owner1/repo1',
      isOpen: true,
      pulls: [
        {
          number: 1,
          title: 'Pull Request 1',
          url: 'https://github.com/owner1/repo1/pull/1',
          baseRef: 'main',
          headRef: 'feature-1',
          checked: true,
          user: { login: 'user1' },
          body: 'This is the body of PR 1.'
        },
        {
          number: 2,
          title: 'Pull Request 2',
          url: 'https://github.com/owner1/repo1/pull/2',
          baseRef: 'main',
          headRef: 'feature-2',
          checked: true,
          user: { login: 'user2' },
          body: 'This is the body of PR 2.'
        }
      ]
    },
    {
      installationId: 2,
      owner: 'owner2',
      name: 'repo2',
      url: 'https://github.com/owner2/repo2',
      isOpen: true,
      pulls: [
        {
          number: 3,
          title: 'Pull Request 3',
          url: 'https://github.com/owner2/repo2/pull/3',
          baseRef: 'main',
          headRef: 'feature-3',
          checked: false,
          user: { login: 'user3' },
          body: null
        }
      ]
    },
    {
      installationId: 3,
      owner: 'owner3',
      name: 'repo3',
      url: 'https://github.com/owner3/repo3',
      isOpen: false,
      pulls: undefined
    }
  ]

  it('should return false if isLoading is true', () => {
    const result = checkIfAllReposChecked(true, mockRepos)
    expect(result).toBe(false)
  })

  it('should return false if repos is undefined', () => {
    const result = checkIfAllReposChecked(false, undefined)
    expect(result).toBe(false)
  })

  it('should return false if repos is an empty array', () => {
    const result = checkIfAllReposChecked(false, [])
    expect(result).toBe(false)
  })

  it('should return false if no repos are open', () => {
    const closedRepos = mockRepos.map((repo) => ({ ...repo, isOpen: false }))
    const result = checkIfAllReposChecked(false, closedRepos)
    expect(result).toBe(false)
  })

  it('should return false if not all pulls in open repos are checked', () => {
    const result = checkIfAllReposChecked(false, mockRepos)
    expect(result).toBe(false)
  })

  it('should return true if all pulls in open repos are checked', () => {
    const allCheckedRepos: TRepo[] = [
      {
        installationId: 1,
        owner: 'owner1',
        name: 'repo1',
        url: 'https://github.com/owner1/repo1',
        isOpen: true,
        pulls: [
          {
            number: 1,
            title: 'Pull Request 1',
            url: 'https://github.com/owner1/repo1/pull/1',
            baseRef: 'main',
            headRef: 'feature-1',
            checked: true,
            user: { login: 'user1' },
            body: 'This is the body of PR 1.'
          },
          {
            number: 2,
            title: 'Pull Request 2',
            url: 'https://github.com/owner1/repo1/pull/2',
            baseRef: 'main',
            headRef: 'feature-2',
            checked: true,
            user: { login: 'user2' },
            body: 'This is the body of PR 2.'
          }
        ]
      }
    ]
    const result = checkIfAllReposChecked(false, allCheckedRepos)
    expect(result).toBe(true)
  })
})
