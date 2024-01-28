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
  type FC,
  type ReactNode,
  forwardRef
} from 'react'

interface IVariantProps {
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'error'
}

interface IToastRootProps
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

const ToastRoot = forwardRef<ElementRef<typeof Root>, IToastRootProps>(
  ({ className, variant, ...props }, ref) => {
    const basicClasses = 'toast'
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
ToastRoot.displayName = Root.displayName

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
    <Cross2Icon className="w-full h-full" />
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

interface IToastProps {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export const Toast: FC<IToastProps> = ({
  title,
  description,
  action,
  ...props
}) => {
  return (
    <ToastRoot {...props}>
      <div className="grid gap-1">
        {title !== undefined && <ToastTitle>{title}</ToastTitle>}
        {description !== undefined && (
          <ToastDescription>{description}</ToastDescription>
        )}
      </div>
      {action !== undefined && (
        <ToastAction asChild altText="action">
          {action}
        </ToastAction>
      )}
      <ToastClose />
    </ToastRoot>
  )
}

type TToastRoot = typeof ToastRoot

export { ToastProvider, ToastViewport, type TToastRoot }
