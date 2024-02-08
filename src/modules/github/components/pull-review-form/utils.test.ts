import type { TPull, TRepo } from '@/types/github/root/index'

import { getFlattenCheckedPulls } from './utils'

describe('getFlattenCheckedPulls', () => {
  it('should return checked pulls information', () => {
    const repos: TRepo[] = [
      {
        owner: 'owner1',
        name: 'repo1',
        url: '',
        pulls: [
          {
            title: 'pull1',
            number: 1,
            checked: true,
            user: { login: 'user1' },
            url: '',
            baseRef: '',
            headRef: ''
          },
          {
            title: 'pull2',
            number: 2,
            checked: false,
            user: { login: 'user2' },
            url: '',
            baseRef: '',
            headRef: ''
          },
          {
            title: 'pull3',
            number: 3,
            checked: true,
            user: { login: 'user3' },
            url: '',
            baseRef: '',
            headRef: ''
          }
        ]
      },
      {
        owner: 'owner1',
        name: 'repo2',
        url: '',
        pulls: [
          {
            title: 'pull1',
            number: 1,
            checked: true,
            user: { login: 'user1' },
            url: '',
            baseRef: '',
            headRef: ''
          },
          {
            title: 'pull2',
            number: 2,
            checked: false,
            user: { login: 'user2' },
            url: '',
            baseRef: '',
            headRef: ''
          }
        ]
      },
      {
        owner: 'owner1',
        name: 'repo3',
        url: '',
        pulls: [
          {
            title: 'pull3',
            number: 3,
            checked: true,
            user: { login: 'user3' },
            url: '',
            baseRef: '',
            headRef: ''
          },
          {
            title: 'pull4',
            number: 4,
            checked: false,
            user: { login: 'user4' },
            url: '',
            baseRef: '',
            headRef: ''
          }
        ]
      }
    ]

    const result = getFlattenCheckedPulls(repos)

    expect(result).toEqual([
      {
        owner: 'owner1',
        pullNumber: 1,
        pullTitle: 'pull1',
        repo: 'repo1',
        user: { login: 'user1' }
      },
      {
        owner: 'owner1',
        pullNumber: 3,
        pullTitle: 'pull3',
        repo: 'repo1',
        user: { login: 'user3' }
      },
      {
        owner: 'owner1',
        pullNumber: 1,
        pullTitle: 'pull1',
        repo: 'repo2',
        user: { login: 'user1' }
      },
      {
        owner: 'owner1',
        pullNumber: 3,
        pullTitle: 'pull3',
        repo: 'repo3',
        user: { login: 'user3' }
      }
    ])
  })

  it('should return empty array if there no checked pull', () => {
    const repos: TRepo[] = [
      {
        owner: 'owner1',
        name: 'repo1',
        url: '',
        pulls: [
          {
            title: 'pull1',
            number: 1,
            checked: false,
            user: { login: 'user1' },
            url: '',
            baseRef: '',
            headRef: ''
          },
          {
            title: 'pull2',
            number: 2,
            checked: false,
            user: { login: 'user2' },
            url: '',
            baseRef: '',
            headRef: ''
          }
        ]
      },
      {
        owner: 'owner1',
        name: 'repo2',
        url: '',
        pulls: [
          {
            title: 'pull3',
            number: 3,
            checked: false,
            user: { login: 'user3' },
            url: '',
            baseRef: '',
            headRef: ''
          },
          {
            title: 'pull4',
            number: 4,
            checked: false,
            user: { login: 'user4' },
            url: '',
            baseRef: '',
            headRef: ''
          }
        ]
      }
    ]

    const result = getFlattenCheckedPulls(repos)

    expect(result).toEqual([])
  })
})
