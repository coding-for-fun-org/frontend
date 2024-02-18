'use client'

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger
} from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  forwardRef
} from 'react'

const DialogRoot = Root

const DialogTrigger = Trigger

const DialogPortal = Portal

const DialogClose = Close

const DialogOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={clsx(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = Overlay.displayName

const DialogContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <div className="fixed z-50 w-full h-full flex justify-center items-center top-0 left-0 px-3">
      <Content
        ref={ref}
        className={clsx(
          'relative flex flex-col max-h-[95%] w-fit max-w-3xl gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          className
        )}
        {...props}
      >
        {children}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </Content>
    </div>
  </DialogPortal>
))
DialogContent.displayName = Content.displayName

const DialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={clsx(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = Title.displayName

const DialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={clsx('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = Description.displayName

type TCustomProps = {
  title: ReactNode
  open: boolean
  onOpenChange(open: boolean): void
  children: ReactNode
  contentOverflow?: 'auto' | 'hidden'
  footer?: ReactNode
  formProps?: FormHTMLAttributes<HTMLFormElement>
}

type TDialogProps = Omit<HTMLAttributes<HTMLDivElement>, keyof TCustomProps> &
  TCustomProps

export const Dialog = ({
  title,
  open,
  onOpenChange,
  children,
  contentOverflow = 'auto',
  footer,
  formProps,
  ...props
}: TDialogProps) => {
  const ContentBody = () => {
    return (
      <>
        <DialogHeader className="flex-shrink">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div
          className={clsx('flex-grow', {
            'overflow-hidden': contentOverflow === 'hidden',
            'overflow-auto': contentOverflow === 'auto'
          })}
        >
          {children}
        </div>

        {footer !== undefined && (
          <DialogFooter className="flex-shrink">{footer}</DialogFooter>
        )}
      </>
    )
  }

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent {...props}>
        {!!formProps && (
          <form {...formProps}>
            <ContentBody />
          </form>
        )}

        {!formProps && <ContentBody />}
      </DialogContent>
    </DialogRoot>
  )
}
Dialog.displayName = 'Dialog'
