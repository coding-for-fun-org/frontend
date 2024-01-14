import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { render, screen } from '@/utils/root/test/testing-library'

describe('Skeleton', () => {
  it('should set className', () => {
    const TEST_CLASS = 'TEST-CLASS'

    render(
      <Skeleton
        data-testid="skeleton-root"
        className={TEST_CLASS}
        variant="rect"
      />
    )

    expect(screen.getByTestId('skeleton-root')).toHaveClass(TEST_CLASS)
  })
})
