import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import { PullListItemStatus } from '@/components/github/root/pull-list-item-status/pull-list-item-status'

describe('PullListItemStatus component', () => {
  const queryClient = new QueryClient()
  it('renders loading skeleton when isLoading is true', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PullListItemStatus
          installationId={1}
          owner="test"
          repo="test"
          pull={{
            number: 1,
            title: 'test1',
            url: 'test1',
            baseRef: 'main',
            headRef: 'test1',
            checked: true,
            body: null,
            user: { login: 'jskurt' }
          }}
        />
      </QueryClientProvider>
    )
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('renders AlertTriangle icon when there is error', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PullListItemStatus
          installationId={1}
          owner="test"
          repo="test"
          pull={{
            number: 1,
            title: 'test1',
            url: 'test1',
            baseRef: 'main',
            headRef: 'test1',
            checked: true,
            body: null,
            user: { login: 'jskurt' }
          }}
        />
      </QueryClientProvider>
    )
    expect(screen.getByTestId('alert-triangle')).toBeInTheDocument()
  })
})
