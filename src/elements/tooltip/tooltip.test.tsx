import {
  render,
  screen,
  userEventSetup
} from '@/utils/root/test/testing-library'

import { Tooltip } from './tooltip'

describe('Tooltip', () => {
  const OPEN_TOOLTIP_BUTTON_TEXT = 'OPEN-TOOLTIP'
  const TOOLTIP_TEXT = 'TOOLTIP-TEXT'

  it('should open tooltip with data-state="delayed-open" in DEFAULT_TOOLTIP_DELAY_DURATION', async () => {
    const user = userEventSetup()
    const TestComponent = () => {
      return (
        <Tooltip tooltip={TOOLTIP_TEXT}>
          <div>{OPEN_TOOLTIP_BUTTON_TEXT}</div>
        </Tooltip>
      )
    }

    render(<TestComponent />)

    await user.hover(screen.getByText(OPEN_TOOLTIP_BUTTON_TEXT))

    expect(
      await screen.findByText(TOOLTIP_TEXT, {
        selector: '[data-state="delayed-open"]'
      })
    ).toBeInTheDocument()
  })

  it('should open tooltip with data-state="delayed-open" as soon as mouse enters if delayDuration is 0', async () => {
    const user = userEventSetup()
    const TestComponent = () => {
      return (
        <Tooltip tooltip={TOOLTIP_TEXT} delayDuration={0}>
          <div>{OPEN_TOOLTIP_BUTTON_TEXT}</div>
        </Tooltip>
      )
    }

    render(<TestComponent />)

    await user.hover(screen.getByText(OPEN_TOOLTIP_BUTTON_TEXT))

    expect(
      screen.getByText(TOOLTIP_TEXT, {
        selector: '[data-state="delayed-open"]'
      })
    ).toBeInTheDocument()
  })
})
