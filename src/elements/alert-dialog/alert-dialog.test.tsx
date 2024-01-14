import { useState } from 'react'

import {
  render,
  screen,
  userEventSetup
} from '@/utils/root/test/testing-library'

import { AlertDialog } from './alert-dialog'

describe('AlertDialog', () => {
  const OPEN_DIALOG_BUTTON_TEXT = 'OPEN-DIALAG'
  const DIALOG_TITLE_TEXT = 'DIALOG-TITLE'
  const DIALOG_CHILDREN_TEXT = 'DIALOG-CHILDREN-TEXT'

  it('should open and close depends on open prop', async () => {
    const user = userEventSetup()
    const TestComponent = () => {
      const [open, setOpen] = useState<boolean>(false)

      const handleOpenChange = (open: boolean) => {
        setOpen(open)
      }

      const closeAlertDialog = () => {
        setOpen(false)
      }

      return (
        <>
          <AlertDialog
            open={open}
            onOpenChange={handleOpenChange}
            title={DIALOG_TITLE_TEXT}
            onActionClick={closeAlertDialog}
          >
            <div>{DIALOG_CHILDREN_TEXT}</div>
          </AlertDialog>

          <div
            onClick={() => {
              setOpen((open) => !open)
            }}
          >
            {OPEN_DIALOG_BUTTON_TEXT}
          </div>
        </>
      )
    }

    render(<TestComponent />)

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()

    await user.click(screen.getByText(OPEN_DIALOG_BUTTON_TEXT))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()

    await user.click(
      screen.getByText('COMMON.ALERT_DIALOG_DEFAULT_CONTINUE_BUTTON')
    )
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()

    await user.click(screen.getByText(OPEN_DIALOG_BUTTON_TEXT))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()

    await user.click(
      screen.getByText('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')
    )
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('should render title and children(body) as expected', async () => {
    const user = userEventSetup()
    const TestComponent = () => {
      const [open, setOpen] = useState<boolean>(false)

      const handleOpenChange = (open: boolean) => {
        setOpen(open)
      }

      const closeAlertDialog = () => {
        setOpen(false)
      }

      return (
        <>
          <AlertDialog
            open={open}
            onOpenChange={handleOpenChange}
            title={DIALOG_TITLE_TEXT}
            onActionClick={closeAlertDialog}
          >
            <div>{DIALOG_CHILDREN_TEXT}</div>
          </AlertDialog>

          <div
            onClick={() => {
              setOpen((open) => !open)
            }}
          >
            {OPEN_DIALOG_BUTTON_TEXT}
          </div>
        </>
      )
    }

    render(<TestComponent />)

    expect(screen.queryByText(DIALOG_TITLE_TEXT)).not.toBeInTheDocument()
    expect(screen.queryByText(DIALOG_CHILDREN_TEXT)).not.toBeInTheDocument()

    await user.click(screen.getByText(OPEN_DIALOG_BUTTON_TEXT))

    expect(screen.getByText(DIALOG_TITLE_TEXT)).toBeInTheDocument()
    expect(screen.getByText(DIALOG_CHILDREN_TEXT)).toBeInTheDocument()
  })

  it('should trigger onOpenChange when the user press escape key or clicks cancel button', async () => {
    const user = userEventSetup()
    const onOpenChangeFn = jest.fn()
    const mockFn = jest.fn()
    const TestComponent = () => {
      const handleOpenChange = (open: boolean) => {
        onOpenChangeFn(open)
      }

      return (
        <AlertDialog
          open={true}
          onOpenChange={handleOpenChange}
          title={DIALOG_TITLE_TEXT}
          onActionClick={mockFn}
        >
          <div>{DIALOG_CHILDREN_TEXT}</div>
        </AlertDialog>
      )
    }

    render(<TestComponent />)

    await user.click(
      screen.getByText('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')
    )
    expect(onOpenChangeFn).toHaveBeenCalledTimes(1)
    expect(onOpenChangeFn).toHaveBeenLastCalledWith(false)

    await user.keyboard('{ESCAPE}')
    expect(onOpenChangeFn).toHaveBeenCalledTimes(2)
    expect(onOpenChangeFn).toHaveBeenLastCalledWith(false)
  })

  it('should set className', () => {
    const TEST_CLASS = 'TEST-CLASS'
    const onOpenChangeFn = jest.fn()
    const mockFn = jest.fn()
    const TestComponent = () => {
      const handleOpenChange = (open: boolean) => {
        onOpenChangeFn(open)
      }

      return (
        <AlertDialog
          className={TEST_CLASS}
          open={true}
          onOpenChange={handleOpenChange}
          title={DIALOG_TITLE_TEXT}
          onActionClick={mockFn}
        >
          <div>{DIALOG_CHILDREN_TEXT}</div>
        </AlertDialog>
      )
    }

    render(<TestComponent />)

    expect(screen.getByRole('alertdialog')).toHaveClass(TEST_CLASS)
  })
})
