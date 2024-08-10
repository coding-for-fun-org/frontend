import { render, screen } from '@/utils/root/test/testing-library'

import { ECheckStatus } from '@/components/github/root/pull-list-item-status/types'

import { type TPull } from '@/types/github/root/index'

import { useCheckStatus } from './hooks'
import { PullListItemStatus } from './pull-list-item-status'

jest.mock('./hooks', () => ({
  useCheckStatus: jest.fn()
}))

const mockedUseCheckStatus = useCheckStatus as jest.MockedFunction<
  typeof useCheckStatus
>

const examplePull: TPull = {
  number: 1,
  title: 'test-repo-1-pull-1',
  url: '"https://github.com/ADtestOrganization/test-repo-1/pull/1"',
  baseRef: 'main',
  headRef: '"test-repo-1-pull-1"',
  checked: false,
  user: {
    login: 'test-lee'
  },
  body: null
}

describe('PullListItemStatus', () => {
  it('should renders loading state', () => {
    mockedUseCheckStatus.mockReturnValue({
      isLoading: true,
      checkStatus: undefined,
      checkStatusText: null,
      error: null
    })

    render(
      <PullListItemStatus
        installationId={1234}
        owner="example"
        repo="repo"
        pull={examplePull}
      />
    )

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('should renders error state', () => {
    mockedUseCheckStatus.mockReturnValue({
      isLoading: false,
      checkStatus: undefined,
      checkStatusText: null,
      error: new Error('Error')
    })

    render(
      <PullListItemStatus
        installationId={1234}
        owner="example"
        repo="repo"
        pull={examplePull}
      />
    )

    expect(screen.getByTestId('error-icon')).toBeInTheDocument()
  })

  it('should renders success state', () => {
    mockedUseCheckStatus.mockReturnValue({
      isLoading: false,
      checkStatus: ECheckStatus.SUCCESS,
      checkStatusText: null,
      error: null
    })

    render(
      <PullListItemStatus
        installationId={1234}
        owner="example"
        repo="repo"
        pull={examplePull}
      />
    )

    expect(screen.getByTestId('success-icon')).toBeInTheDocument()
  })

  it('should renders running state', () => {
    mockedUseCheckStatus.mockReturnValue({
      isLoading: false,
      checkStatus: ECheckStatus.RUNNING,
      checkStatusText: null,
      error: null
    })

    render(
      <PullListItemStatus
        installationId={1234}
        owner="example"
        repo="repo"
        pull={examplePull}
      />
    )

    expect(screen.getByTestId('running-icon')).toBeInTheDocument()
  })

  it('should renders failed state', () => {
    mockedUseCheckStatus.mockReturnValue({
      isLoading: false,
      checkStatus: ECheckStatus.FAILED,
      checkStatusText: null,
      error: null
    })

    render(
      <PullListItemStatus
        installationId={1234}
        owner="example"
        repo="repo"
        pull={examplePull}
      />
    )

    expect(screen.getByTestId('failed-icon')).toBeInTheDocument()
  })
})
