import {
  render,
  screen,
  userEventSetup
} from '@/utils/root/test/testing-library'

import { DEFAULT_TOOLTIP_DELAY_DURATION, Tooltip } from './tooltip'

describe('Tooltip', () => {
  const OPEN_TOOLTIP_BUTTON_TEXT = 'OPEN-TOOLTIP'
  const TOOLTIP_TEXT = 'TOOLTIP-TEXT'

  it('should open tooltip with data-state="delayed-open" in DEFAULT_TOOLTIP_DELAY_DURATION', (done) => {
    const user = userEventSetup({ delay: DEFAULT_TOOLTIP_DELAY_DURATION })
    const TestComponent = () => {
      return (
        <Tooltip tooltip={TOOLTIP_TEXT}>
          <div>{OPEN_TOOLTIP_BUTTON_TEXT}</div>
        </Tooltip>
      )
    }

    render(<TestComponent />)

    user
      .hover(screen.getByText(OPEN_TOOLTIP_BUTTON_TEXT))
      .then(() => {
        expect(
          screen.getByText(TOOLTIP_TEXT, {
            selector: '[data-state="delayed-open"]'
          })
        ).toBeInTheDocument()

        done()
      })
      .catch(console.error)

    expect(
      screen.queryByText(TOOLTIP_TEXT, {
        selector: '[data-state="delayed-open"]'
      })
    ).not.toBeInTheDocument()
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

  it('should not open tooltip if tooltip is null', async () => {
    const user = userEventSetup({ delay: DEFAULT_TOOLTIP_DELAY_DURATION })
    const TestComponent = () => {
      return (
        <Tooltip tooltip={null}>
          <div>{OPEN_TOOLTIP_BUTTON_TEXT}</div>
        </Tooltip>
      )
    }

    const { container } = render(<TestComponent />)

    await user.hover(screen.getByText(OPEN_TOOLTIP_BUTTON_TEXT))

    expect(
      container.querySelector('[data-state="delayed-open"]')
    ).not.toBeInTheDocument()
  })
})
