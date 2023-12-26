import {
  CheckCircledIcon,
  CrossCircledIcon,
  DrawingPinIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons'
import clsx from 'clsx'
import { type FC, type HTMLAttributes, type ReactNode, forwardRef } from 'react'

export interface IVariantProps {
  variant?: 'primary' | 'success' | 'info' | 'error'
}

const AlertRoot = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & IVariantProps
>(({ className, variant, ...props }, ref) => {
  const basicClasses = 'alert'
  const variantClasses: Record<Required<IVariantProps>['variant'], string> = {
    primary: 'variant--primary',
    success: 'variant--success',
    info: 'variant--info',
    error: 'variant--error'
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={clsx(
        basicClasses,
        variantClasses[variant ?? 'primary'],
        className
      )}
      {...props}
    />
  )
})
AlertRoot.displayName = 'Alert'

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={clsx('alert__title', className)} {...props} />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx('alert__description', className)} {...props} />
))
AlertDescription.displayName = 'AlertDescription'

interface IAlertProps extends IVariantProps {
  title: ReactNode
  description: ReactNode
}

export const Alert: FC<IAlertProps> = ({ variant, title, description }) => {
  return (
    <AlertRoot variant={variant}>
      {(variant === undefined || variant === 'primary') && (
        <DrawingPinIcon className="h-4 w-4" />
      )}
      {variant === 'success' && <CheckCircledIcon className="h-4 w-4" />}
      {variant === 'info' && <InfoCircledIcon className="h-4 w-4" />}
      {variant === 'error' && <CrossCircledIcon className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </AlertRoot>
  )
}
Alert.displayName = 'Alert'
