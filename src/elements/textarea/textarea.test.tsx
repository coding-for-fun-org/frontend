import { Textarea } from '@/elements/root/textarea/textarea'

import { render, screen } from '@/utils/root/test/testing-library'

describe('Textarea', () => {
  it('should set className', () => {
    const TEST_CLASS = 'TEST-CLASS'

    render(<Textarea data-testid="textarea-root" className={TEST_CLASS} />)

    expect(screen.getByTestId('textarea-root')).toHaveClass(TEST_CLASS)
  })
})
