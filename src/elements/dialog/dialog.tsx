'use client'

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title
} from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { X } from 'lucide-react'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  memo
} from 'react'

type TWidthType = 'narrow' | 'default' | 'wide' | 'full'

const DialogRoot = Root
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
  ComponentPropsWithoutRef<typeof Content> & { widthType: TWidthType }
>(({ className, children, widthType, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <div className="fixed z-50 w-full h-full flex justify-center items-center top-0 left-0 px-3">
      <Content
        ref={ref}
        className={clsx(
          'dialog',
          {
            'width--narrow': widthType === 'narrow',
            'width--default': widthType === 'default',
            'width--wide': widthType === 'wide',
            'width--full': widthType === 'full'
          },
          className
        )}
        {...props}
      >
        {children}
        <DialogClose className="dialog__close">
          <X className="h-4 w-4" />
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
  <div className={clsx('dialog__header', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'
const DialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('dialog__footer', className)} {...props} />
)
DialogFooter.displayName = 'DialogFooter'
const DialogTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title ref={ref} className={clsx('dialog__title', className)} {...props} />
))
DialogTitle.displayName = Title.displayName
const DialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={clsx('dialog__description', className)}
    {...props}
  />
))
DialogDescription.displayName = Description.displayName
type TCustomProps = {
  title: ReactNode
  open: boolean
  onOpenChange(open: boolean): void
  children: ReactNode
  widthType?: TWidthType
  contentOverflow?: 'auto' | 'hidden'
  footer?: ReactNode
  formProps?: FormHTMLAttributes<HTMLFormElement>
}
type TDialogProps = Omit<HTMLAttributes<HTMLDivElement>, keyof TCustomProps> &
  TCustomProps

type TDialogContentProps = Pick<
  TDialogProps,
  'title' | 'children' | 'contentOverflow' | 'footer'
>
const ContentBody = memo(
  ({
    title,
    children,
    contentOverflow = 'auto',
    footer
  }: TDialogContentProps) => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          className={clsx('dialog__body', {
            'overflow-hidden': contentOverflow === 'hidden',
            'overflow-auto': contentOverflow === 'auto'
          })}
        >
          {children}
        </div>
        {footer !== undefined && <DialogFooter>{footer}</DialogFooter>}
      </>
    )
  }
)
export const Dialog = ({
  title,
  open,
  onOpenChange,
  children,
  widthType = 'default',
  contentOverflow = 'auto',
  footer,
  formProps,
  ...props
}: TDialogProps) => {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent widthType={widthType} {...props}>
        {!!formProps && (
          <form {...formProps}>
            <ContentBody
              title={title}
              children={children}
              contentOverflow={contentOverflow}
              footer={footer}
            />
          </form>
        )}
        {!formProps && (
          <ContentBody
            title={title}
            children={children}
            contentOverflow={contentOverflow}
            footer={footer}
          />
        )}
      </DialogContent>
    </DialogRoot>
  )
}
Dialog.displayName = 'Dialog'
