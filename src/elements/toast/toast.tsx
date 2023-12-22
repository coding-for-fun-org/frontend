import { Cross2Icon } from '@radix-ui/react-icons'
import {
  Action,
  Close,
  Description,
  Provider,
  Root,
  Title,
  Viewport
} from '@radix-ui/react-toast'
import clsx from 'clsx'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef
} from 'react'

interface IVariantProps {
  variant?: 'default' | 'secondary' | 'success' | 'info' | 'error'
}

interface IToastProps
  extends ComponentPropsWithoutRef<typeof Root>,
    IVariantProps {}

const ToastProvider = Provider

const ToastViewport = forwardRef<
  ElementRef<typeof Viewport>,
  ComponentPropsWithoutRef<typeof Viewport>
>(({ className, ...props }, ref) => (
  <Viewport
    ref={ref}
    className={clsx(
      'gap-2 fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = Viewport.displayName

const Toast = forwardRef<ElementRef<typeof Root>, IToastProps>(
  ({ className, variant, ...props }, ref) => {
    const basicClasses =
      'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full'
    const variantClasses: Record<Required<IVariantProps>['variant'], string> = {
      default: 'border bg-background text-foreground',
      secondary: 'border bg-secondary text-secondary-foreground',
      success: 'border-success bg-success text-success-foreground',
      info: 'border-info bg-info text-info-foreground',
      error: 'border-error bg-error text-error-foreground'
    }

    return (
      <Root
        ref={ref}
        className={clsx(
          basicClasses,
          variantClasses[variant ?? 'default'],
          className
        )}
        {...props}
      />
    )
  }
)
Toast.displayName = Root.displayName

const ToastAction = forwardRef<
  ElementRef<typeof Action>,
  ComponentPropsWithoutRef<typeof Action>
>(({ className, ...props }, ref) => (
  <Action
    ref={ref}
    className={clsx(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = Action.displayName

const ToastClose = forwardRef<
  ElementRef<typeof Close>,
  ComponentPropsWithoutRef<typeof Close>
>(({ className, ...props }, ref) => (
  <Close
    ref={ref}
    className={clsx(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    <Cross2Icon className="h-4 w-4" />
  </Close>
))
ToastClose.displayName = Close.displayName

const ToastTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={clsx('text-sm font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = Title.displayName

const ToastDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={clsx('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = Description.displayName

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction
}
