import {
  Cancel,
  Content,
  Overlay,
  Portal,
  Root,
  Title
} from '@radix-ui/react-alert-dialog'
import clsx from 'clsx'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FC,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  forwardRef
} from 'react'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

const AlertDialogRoot = Root

const AlertDialogPortal = Portal

const AlertDialogOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    className={clsx(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = Overlay.displayName

const AlertDialogContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <Content
      ref={ref}
      className={clsx(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={clsx('text-lg font-semibold', className)}
    {...props}
  />
))
AlertDialogTitle.displayName = Title.displayName

/*  const AlertDialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={clsx('text-sm text-muted-foreground', className)}
    {...props}
  />
))
AlertDialogDescription.displayName = Description.displayName

const AlertDialogAction = forwardRef<
  ElementRef<typeof Action>,
  ComponentPropsWithoutRef<typeof Action>
>(({ className, ...props }, ref) => (
  <Action
    ref={ref}
    className={clsx('button variant--primary size--md', className)}
    {...props}
  />
))
AlertDialogAction.displayName = Action.displayName */

const AlertDialogCancel = forwardRef<
  ElementRef<typeof Cancel>,
  ComponentPropsWithoutRef<typeof Cancel>
>(({ className, ...props }, ref) => (
  <Cancel
    ref={ref}
    className={clsx('button variant--outline size--md mt-2 sm:mt-0', className)}
    {...props}
  />
))
AlertDialogCancel.displayName = Cancel.displayName

interface AlertDialogProps {
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onActionClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  cancelLabel?: string
  actionLabel?: string
}

export const AlertDialog: FC<AlertDialogProps> = ({
  title,
  open,
  onOpenChange,
  onActionClick,
  children,
  cancelLabel,
  actionLabel
}) => {
  const { translate } = useDictionary()

  return (
    <AlertDialogRoot open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <div className="mt-2">{children}</div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              label={
                cancelLabel ??
                translate('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')
              }
            ></Button>
          </AlertDialogCancel>
          <Button
            variant="primary"
            label={
              actionLabel ??
              translate('COMMON.ALERT_DIALOG_DEFAULT_CONTINUE_BUTTON')
            }
            onClick={onActionClick}
          ></Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}
AlertDialog.displayName = 'AlertDialog'
