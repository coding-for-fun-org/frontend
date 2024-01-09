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

type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  IVariantProps & {
    title: ReactNode
    description?: ReactNode
  }

export const Alert: FC<AlertProps> = ({
  className,
  variant,
  title,
  description
}) => {
  return (
    <AlertRoot variant={variant} className={className}>
      <div className="flex items-center gap-2">
        {(variant === undefined || variant === 'primary') && <DrawingPinIcon />}
        {variant === 'success' && <CheckCircledIcon />}
        {variant === 'info' && <InfoCircledIcon />}
        {variant === 'error' && <CrossCircledIcon />}
        <AlertTitle>{title}</AlertTitle>
      </div>
      {!!description && (
        <AlertDescription className="ml-6">{description}</AlertDescription>
      )}
    </AlertRoot>
  )
}
Alert.displayName = 'Alert'
