import { useState } from 'react'

import {
  render,
  screen,
  userEventSetup
} from '@/utils/root/test/testing-library'

import { Tabs } from './tabs'

describe('Tabs', () => {
  const TAB_LABEL_0 = 'TAB-LABEL-0'
  const TAB_LABEL_1 = 'TAB-LABEL-1'
  const TAB_LABEL_2 = 'TAB-LABEL-2'
  const TAB_CHILDREN_TEXT_0 = 'TAB-CHILDREN-TEXT-0'
  const TAB_CHILDREN_TEXT_1 = 'TAB-CHILDREN-TEXT-1'
  const TAB_CHILDREN_TEXT_2 = 'TAB-CHILDREN-TEXT-2'
  const tabValues = [
    {
      label: TAB_LABEL_0,
      value: '0',
      children: <div>{TAB_CHILDREN_TEXT_0}</div>
    },
    {
      label: TAB_LABEL_1,
      value: '1',
      children: <div>{TAB_CHILDREN_TEXT_1}</div>
    },
    {
      label: TAB_LABEL_2,
      value: '2',
      children: <div>{TAB_CHILDREN_TEXT_2}</div>
    }
  ]

  it('should render values as expected', () => {
    const TestComponent = () => {
      const [value, setValue] = useState<string>('0')

      const handleValueChange = (value: string) => {
        setValue(value)
      }

      return (
        <Tabs
          values={tabValues}
          value={String(value)}
          onValueChange={handleValueChange}
        />
      )
    }

    render(<TestComponent />)

    expect(screen.getByText(TAB_LABEL_0)).toBeInTheDocument()
    expect(screen.getByText(TAB_LABEL_1)).toBeInTheDocument()
    expect(screen.getByText(TAB_LABEL_2)).toBeInTheDocument()
    expect(screen.getByText(TAB_CHILDREN_TEXT_0)).toBeInTheDocument()
    expect(screen.queryByText(TAB_CHILDREN_TEXT_1)).not.toBeInTheDocument()
    expect(screen.queryByText(TAB_CHILDREN_TEXT_2)).not.toBeInTheDocument()
  })

  it('should render focused value children', async () => {
    const user = userEventSetup()
    const TestComponent = () => {
      const [value, setValue] = useState<string>('0')

      const handleValueChange = (value: string) => {
        setValue(value)
      }

      return (
        <Tabs
          values={tabValues}
          value={String(value)}
          onValueChange={handleValueChange}
        />
      )
    }

    render(<TestComponent />)

    await user.click(screen.getByText(TAB_LABEL_1))

    expect(screen.queryByText(TAB_CHILDREN_TEXT_0)).not.toBeInTheDocument()
    expect(screen.getByText(TAB_CHILDREN_TEXT_1)).toBeInTheDocument()
    expect(screen.queryByText(TAB_CHILDREN_TEXT_2)).not.toBeInTheDocument()

    await user.click(screen.getByText(TAB_LABEL_2))

    expect(screen.queryByText(TAB_CHILDREN_TEXT_0)).not.toBeInTheDocument()
    expect(screen.queryByText(TAB_CHILDREN_TEXT_1)).not.toBeInTheDocument()
    expect(screen.getByText(TAB_CHILDREN_TEXT_2)).toBeInTheDocument()
  })

  it('should set className', () => {
    const TEST_CLASS = 'TEST-CLASS'
    const TestComponent = () => {
      const [value, setValue] = useState<string>('0')

      const handleValueChange = (value: string) => {
        setValue(value)
      }

      return (
        <Tabs
          className={TEST_CLASS}
          values={tabValues}
          value={String(value)}
          onValueChange={handleValueChange}
        />
      )
    }

    render(<TestComponent />)

    expect(screen.getByTestId('tabs-root')).toHaveClass(TEST_CLASS)
  })

  it('should has expected role', () => {
    const TestComponent = () => {
      const [value, setValue] = useState<string>('0')

      const handleValueChange = (value: string) => {
        setValue(value)
      }

      return (
        <Tabs
          values={tabValues}
          value={String(value)}
          onValueChange={handleValueChange}
        />
      )
    }

    render(<TestComponent />)

    expect(screen.getByTestId('tabs-list')).toHaveAttribute('role', 'tablist')
    screen.getAllByTestId('tabs-trigger').forEach((trigger) => {
      expect(trigger).toHaveAttribute('role', 'tab')
    })
    screen.getAllByTestId('tabs-content').forEach((content) => {
      expect(content).toHaveAttribute('role', 'tabpanel')
    })
  })

  it('should have only one active tabpanel', () => {
    const TestComponent = () => {
      const [value, setValue] = useState<string>('0')

      const handleValueChange = (value: string) => {
        setValue(value)
      }

      return (
        <Tabs
          values={tabValues}
          value={String(value)}
          onValueChange={handleValueChange}
        />
      )
    }

    render(<TestComponent />)

    screen.getAllByRole('tabpanel').forEach((tabpanel, index) => {
      if (index === 0) {
        // only active tabpanel has data-state="active" which is the first tabpanel
        expect(tabpanel).toHaveAttribute('data-state', 'active')
      } else {
        // inactive tabpanels have data-state="inactive"
        expect(tabpanel).toHaveAttribute('data-state', 'inactive')
      }
    })
  })
})
