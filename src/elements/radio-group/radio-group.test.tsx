import { useState } from 'react'

import { RadioGroup } from '@/elements/root/radio-group/radio-group'

import {
  render,
  screen,
  userEventSetup
} from '@/utils/root/test/testing-library'

describe('RadioGroup', () => {
  const RADIO_LABEL_0 = 'TAB-LABEL-0'
  const RADIO_LABEL_1 = 'TAB-LABEL-1'
  const RADIO_LABEL_2 = 'TAB-LABEL-2'
  const radioValues = [
    {
      label: RADIO_LABEL_0,
      value: '0'
    },
    {
      label: RADIO_LABEL_1,
      value: '1'
    },
    {
      label: RADIO_LABEL_2,
      value: '2'
    }
  ]

  it('should render values as expected', () => {
    const TestComponent = () => {
      const [value, setValue] = useState<string>('0')

      const handleValueChange = (value: string) => {
        setValue(value)
      }

      return (
        <RadioGroup
          values={radioValues}
          value={String(value)}
          onValueChange={handleValueChange}
        />
      )
    }

    render(<TestComponent />)

    expect(screen.getByText(RADIO_LABEL_0)).toBeInTheDocument()
    expect(screen.getByText(RADIO_LABEL_1)).toBeInTheDocument()
    expect(screen.getByText(RADIO_LABEL_2)).toBeInTheDocument()
  })

  it('should has expected role', () => {
    const TestComponent = () => {
      const [value, setValue] = useState<string>('0')

      const handleValueChange = (value: string) => {
        setValue(value)
      }

      return (
        <RadioGroup
          values={radioValues}
          value={String(value)}
          onValueChange={handleValueChange}
        />
      )
    }

    render(<TestComponent />)

    expect(screen.getByTestId('radio-group-item-0')).toHaveAttribute(
      'role',
      'radio'
    )
    expect(screen.getByTestId('radio-group-item-1')).toHaveAttribute(
      'role',
      'radio'
    )
    expect(screen.getByTestId('radio-group-item-2')).toHaveAttribute(
      'role',
      'radio'
    )
  })

  it('should has expected aria-checked', async () => {
    const user = userEventSetup()
    const TestComponent = () => {
      const [value, setValue] = useState<string>('0')

      const handleValueChange = (value: string) => {
        setValue(value)
      }

      return (
        <RadioGroup
          values={radioValues}
          value={String(value)}
          onValueChange={handleValueChange}
        />
      )
    }

    render(<TestComponent />)

    expect(screen.getByTestId('radio-group-item-0')).toHaveAttribute(
      'aria-checked',
      'true'
    )
    expect(screen.getByTestId('radio-group-item-1')).toHaveAttribute(
      'aria-checked',
      'false'
    )
    expect(screen.getByTestId('radio-group-item-2')).toHaveAttribute(
      'aria-checked',
      'false'
    )

    await user.click(screen.getByTestId('radio-group-item-1'))

    expect(screen.getByTestId('radio-group-item-0')).toHaveAttribute(
      'aria-checked',
      'false'
    )
    expect(screen.getByTestId('radio-group-item-1')).toHaveAttribute(
      'aria-checked',
      'true'
    )
    expect(screen.getByTestId('radio-group-item-2')).toHaveAttribute(
      'aria-checked',
      'false'
    )
  })
})
