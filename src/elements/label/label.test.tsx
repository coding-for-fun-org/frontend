import { Label } from '@/elements/root/label/label'

import { render, screen } from '@/utils/root/test/testing-library'

describe('Label', () => {
  it('should set className and set children', () => {
    const TEST_CLASS = 'TEST-CLASS'
    const TEST_TEXT = 'TEST-TEXT'

    render(<Label className={TEST_CLASS}>{TEST_TEXT}</Label>)

    expect(screen.getByText(TEST_TEXT)).toHaveClass(TEST_CLASS)
  })
})
