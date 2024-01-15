import { useEffect, useState } from 'react'

import { Progress } from '@/elements/root/progress/progress'

import { act, render, screen, within } from '@/utils/root/test/testing-library'

describe('Progress', () => {
  it('should set className', () => {
    const TEST_CLASS = 'TEST-CLASS'

    render(<Progress className={TEST_CLASS} value={0} />)

    expect(screen.getByRole('progressbar')).toHaveClass(TEST_CLASS)
  })

  it('should set indicator style as expected by value (max is 100 by default)', () => {
    jest.useFakeTimers()

    const INTERVAL = 100
    const TestComponent = () => {
      const [value, setValue] = useState(23)

      useEffect(() => {
        const timer = setInterval(() => {
          act(() => {
            setValue((prev) => prev + 30)
          })
        }, INTERVAL)

        return () => {
          if (timer) {
            clearInterval(timer)
          }
        }
      }, [])

      return <Progress value={value} />
    }

    render(<TestComponent />)

    const indicator = within(screen.getByRole('progressbar')).getByTestId(
      'progress-indicator'
    )

    expect(indicator).toHaveStyle({
      transform: 'translateX(-77%)'
    })
    jest.advanceTimersByTime(INTERVAL)
    expect(indicator).toHaveStyle({
      transform: 'translateX(-47%)'
    })
    jest.advanceTimersByTime(INTERVAL)
    expect(indicator).toHaveStyle({
      transform: 'translateX(-17%)'
    })
    jest.advanceTimersByTime(INTERVAL)
    expect(indicator).toHaveStyle({
      transform: 'translateX(-0%)'
    })
    jest.advanceTimersByTime(INTERVAL)
    expect(indicator).toHaveStyle({
      transform: 'translateX(-0%)'
    })
  })

  it('should set max as expected', () => {
    jest.useFakeTimers()

    const INTERVAL = 100
    const TestComponent = () => {
      const [value, setValue] = useState(23)

      useEffect(() => {
        const timer = setInterval(() => {
          act(() => {
            setValue((prev) => prev + 30)
          })
        }, INTERVAL)

        return () => {
          if (timer) {
            clearInterval(timer)
          }
        }
      }, [])

      return <Progress value={value} max={68} />
    }

    render(<TestComponent />)

    const indicator = within(screen.getByRole('progressbar')).getByTestId(
      'progress-indicator'
    )

    expect(indicator).toHaveStyle({
      transform: 'translateX(-45%)'
    })
    jest.advanceTimersByTime(INTERVAL)
    expect(indicator).toHaveStyle({
      transform: 'translateX(-15%)'
    })
    jest.advanceTimersByTime(INTERVAL)
    expect(indicator).toHaveStyle({
      transform: 'translateX(-0%)'
    })
    jest.advanceTimersByTime(INTERVAL)
    expect(indicator).toHaveStyle({
      transform: 'translateX(-0%)'
    })
  })
})
