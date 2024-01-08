import { getCheckedPullsInfo } from '@/components/github/root/pull-review-form/utils'

import type { TRepoHasCheck } from '@/types/github/root/index'

describe('getCheckedPullsInfo', () => {
  it('should return checked pulls information', () => {
    const repoHasCheckArray: TRepoHasCheck[] = [
      {
        org: 'org1',
        repo: 'repo1',
        pulls: [
          {
            title: 'pull1',
            number: 1,
            isChecked: true,
            user: { login: 'user1' }
          },
          {
            title: 'pull2',
            number: 2,
            isChecked: false,
            user: { login: 'user2' }
          },
          {
            title: 'pull3',
            number: 3,
            isChecked: true,
            user: { login: 'user3' }
          }
        ]
      },
      {
        org: 'org1',
        repo: 'repo2',
        pulls: [
          {
            title: 'pull1',
            number: 1,
            isChecked: true,
            user: { login: 'user1' }
          },
          {
            title: 'pull2',
            number: 2,
            isChecked: false,
            user: { login: 'user2' }
          }
        ]
      },
      {
        org: 'org1',
        repo: 'repo3',
        pulls: [
          {
            title: 'pull3',
            number: 3,
            isChecked: true,
            user: { login: 'user3' }
          },
          {
            title: 'pull4',
            number: 4,
            isChecked: false,
            user: { login: 'user4' }
          }
        ]
      }
    ]

    const result = getCheckedPullsInfo(repoHasCheckArray)

    expect(result).toEqual([
      { org: 'org1', repo: 'repo1', pullTitle: 'pull1', pullNumber: 1 },
      { org: 'org1', repo: 'repo1', pullTitle: 'pull3', pullNumber: 3 },
      { org: 'org1', repo: 'repo2', pullTitle: 'pull1', pullNumber: 1 },
      { org: 'org1', repo: 'repo3', pullTitle: 'pull3', pullNumber: 3 }
    ])
  })

  it('should return empty array if there no checked pull', () => {
    const repoHasCheckArray: TRepoHasCheck[] = [
      {
        org: 'org1',
        repo: 'repo1',
        pulls: [
          {
            title: 'pull1',
            number: 1,
            isChecked: false,
            user: { login: 'user1' }
          },
          {
            title: 'pull2',
            number: 2,
            isChecked: false,
            user: { login: 'user2' }
          }
        ]
      },
      {
        org: 'org1',
        repo: 'repo2',
        pulls: [
          {
            title: 'pull3',
            number: 3,
            isChecked: false,
            user: { login: 'user3' }
          },
          {
            title: 'pull4',
            number: 4,
            isChecked: false,
            user: { login: 'user4' }
          }
        ]
      }
    ]

    const result = getCheckedPullsInfo(repoHasCheckArray)

    expect(result).toEqual([])
  })
})
