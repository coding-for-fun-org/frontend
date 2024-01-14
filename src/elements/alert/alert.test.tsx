import { render, screen } from '@/utils/root/test/testing-library'

import { Alert } from './alert'

describe('Alert', () => {
  const ALERT_TITLE_TEXT = 'ALERT-TITLE-TEXT'
  const ALERT_DESCRIPTION_TEXT = 'ALERT-DESCRIPTION-TEXT'

  describe('variant primary or undefined', () => {
    it('should render pin-icon (variant undefined)', () => {
      render(<Alert title={ALERT_TITLE_TEXT} />)

      expect(screen.getByTestId('pin-icon')).toBeInTheDocument()
    })

    it('should render pin-icon (variant primary)', () => {
      render(<Alert variant="primary" title={ALERT_TITLE_TEXT} />)

      expect(screen.getByTestId('pin-icon')).toBeInTheDocument()
    })
  })

  describe('variant success', () => {
    it('should render circle-icon', () => {
      render(<Alert variant="success" title={ALERT_TITLE_TEXT} />)

      expect(screen.getByTestId('circle-icon')).toBeInTheDocument()
    })
  })

  describe('variant info', () => {
    it('should render info-circled-icon', () => {
      render(<Alert variant="info" title={ALERT_TITLE_TEXT} />)

      expect(screen.getByTestId('info-circled-icon')).toBeInTheDocument()
    })
  })

  describe('variant error', () => {
    it('should render cross-circled-icon', () => {
      render(<Alert variant="error" title={ALERT_TITLE_TEXT} />)

      expect(screen.getByTestId('cross-circled-icon')).toBeInTheDocument()
    })
  })

  it('should set className', () => {
    const TEST_CLASS = 'TEST-CLASS'

    render(<Alert className={TEST_CLASS} title={ALERT_TITLE_TEXT} />)

    expect(screen.getByRole('alert')).toHaveClass(TEST_CLASS)
  })

  it('should not render description wrapper if description prop is undefined', () => {
    render(<Alert title={ALERT_TITLE_TEXT} />)

    expect(screen.queryByTestId('description')).not.toBeInTheDocument()
  })

  it('should render title and description as expected', () => {
    render(
      <Alert title={ALERT_TITLE_TEXT} description={ALERT_DESCRIPTION_TEXT} />
    )

    expect(screen.getByText(ALERT_TITLE_TEXT)).toBeInTheDocument()
    expect(screen.getByText(ALERT_DESCRIPTION_TEXT)).toBeInTheDocument()
  })
})
