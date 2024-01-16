import { useState } from 'react'

import {
  render,
  screen,
  userEventSetup
} from '@/utils/root/test/testing-library'

import { Dialog } from './dialog'

describe('Dialog', () => {
  const OPEN_DIALOG_BUTTON_TEXT = 'OPEN-DIALAG'
  const FOOTER_DATA_TESTID = 'FOOTER-DATA-TESTID'
  const DIALOG_TITLE_TEXT = 'DIALOG-TITLE'
  const DIALOG_CHILDREN_TEXT = 'DIALOG-CHILDREN-TEXT'

  it('should open and close depends on open prop', async () => {
    const user = userEventSetup()
    const TestComponent = () => {
      const [open, setOpen] = useState<boolean>(false)

      const handleOpenChange = (open: boolean) => {
        setOpen(open)
      }

      const closeDialog = () => {
        setOpen(false)
      }

      return (
        <>
          <Dialog
            open={open}
            onOpenChange={handleOpenChange}
            title={DIALOG_TITLE_TEXT}
            footer={
              <div
                data-testid={FOOTER_DATA_TESTID}
                onClick={() => {
                  closeDialog()
                }}
              ></div>
            }
          >
            <div>{DIALOG_CHILDREN_TEXT}</div>
          </Dialog>

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

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByText(OPEN_DIALOG_BUTTON_TEXT))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByTestId(FOOTER_DATA_TESTID))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByText(OPEN_DIALOG_BUTTON_TEXT))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByTestId(FOOTER_DATA_TESTID))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render title and children(body) as expected', async () => {
    const user = userEventSetup()
    const TestComponent = () => {
      const [open, setOpen] = useState<boolean>(false)

      const handleOpenChange = (open: boolean) => {
        setOpen(open)
      }

      const closeDialog = () => {
        setOpen(false)
      }

      return (
        <>
          <Dialog
            open={open}
            onOpenChange={handleOpenChange}
            title={DIALOG_TITLE_TEXT}
            footer={
              <div
                data-testid={FOOTER_DATA_TESTID}
                onClick={() => {
                  closeDialog()
                }}
              ></div>
            }
          >
            <div>{DIALOG_CHILDREN_TEXT}</div>
          </Dialog>

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

  it('should trigger onOpenChange when the user press escape key', async () => {
    const user = userEventSetup()
    const onOpenChangeFn = jest.fn()
    const TestComponent = () => {
      const handleOpenChange = (open: boolean) => {
        onOpenChangeFn(open)
      }

      return (
        <Dialog
          open={true}
          onOpenChange={handleOpenChange}
          title={DIALOG_TITLE_TEXT}
        >
          <div>{DIALOG_CHILDREN_TEXT}</div>
        </Dialog>
      )
    }

    render(<TestComponent />)

    await user.keyboard('{ESCAPE}')
    expect(onOpenChangeFn).toHaveBeenCalledTimes(1)
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
        <Dialog
          className={TEST_CLASS}
          open={true}
          onOpenChange={handleOpenChange}
          title={DIALOG_TITLE_TEXT}
        >
          <div>{DIALOG_CHILDREN_TEXT}</div>
        </Dialog>
      )
    }

    render(<TestComponent />)

    expect(screen.getByRole('dialog')).toHaveClass(TEST_CLASS)
  })
})
