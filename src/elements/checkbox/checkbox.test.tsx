import { useState } from 'react'

import { Checkbox } from '@/elements/root/checkbox/checkbox'

import {
  render,
  screen,
  userEventSetup
} from '@/utils/root/test/testing-library'

describe('Checkbox', () => {
  it('should set className', () => {
    const TEST_CLASS = 'TEST-CLASS'

    render(
      <Checkbox
        className={TEST_CLASS}
        checked={false}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCheckedChange={() => {}}
      />
    )

    expect(screen.getByRole('checkbox')).toHaveClass(TEST_CLASS)
  })

  it('should have data-state="checked" or data-state="unchecked" depends on checked prop', async () => {
    const user = userEventSetup()
    const TestComponent = () => {
      const [checked, setChecked] = useState(false)

      return <Checkbox checked={checked} onCheckedChange={setChecked} />
    }

    render(<TestComponent />)

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toHaveAttribute('data-state', 'unchecked')

    await user.click(checkbox)
    expect(checkbox).toHaveAttribute('data-state', 'checked')

    await user.click(checkbox)
    expect(checkbox).toHaveAttribute('data-state', 'unchecked')
  })
})
