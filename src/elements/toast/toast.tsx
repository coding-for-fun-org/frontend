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
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'error'
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
    className={clsx('toast-viewport', className)}
    {...props}
  />
))
ToastViewport.displayName = Viewport.displayName

const Toast = forwardRef<ElementRef<typeof Root>, IToastProps>(
  ({ className, variant, ...props }, ref) => {
    const basicClasses = 'toast group'
    const variantClasses: Record<Required<IVariantProps>['variant'], string> = {
      primary: 'variant--primary',
      secondary: 'variant--secondary',
      success: 'variant--success',
      info: 'variant--info',
      error: 'variant--error'
    }

    return (
      <Root
        ref={ref}
        className={clsx(
          basicClasses,
          variantClasses[variant ?? 'primary'],
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
  <Action ref={ref} className={clsx('toast__action', className)} {...props} />
))
ToastAction.displayName = Action.displayName

const ToastClose = forwardRef<
  ElementRef<typeof Close>,
  ComponentPropsWithoutRef<typeof Close>
>(({ className, ...props }, ref) => (
  <Close
    ref={ref}
    className={clsx('toast__close', className)}
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
  <Title ref={ref} className={clsx('toast__title', className)} {...props} />
))
ToastTitle.displayName = Title.displayName

const ToastDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={clsx('toast__description', className)}
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
