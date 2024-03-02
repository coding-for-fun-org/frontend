import clsx from 'clsx'
import { CheckCircle, Info, Pin, XCircle } from 'lucide-react'
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'

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

type TCustomProps = {
  title: ReactNode
  description?: ReactNode
}

type TAlertProps = IVariantProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof TCustomProps> &
  TCustomProps

export const Alert = ({
  variant,
  title,
  description,
  ...props
}: TAlertProps) => {
  return (
    <AlertRoot variant={variant} {...props}>
      <div className="flex items-center gap-2">
        {(variant === undefined || variant === 'primary') && (
          <Pin data-testid="pin-icon" />
        )}
        {variant === 'success' && <CheckCircle data-testid="circle-icon" />}
        {variant === 'info' && <Info data-testid="info-circled-icon" />}
        {variant === 'error' && <XCircle data-testid="cross-circled-icon" />}
        <AlertTitle>{title}</AlertTitle>
      </div>
      {!!description && (
        <AlertDescription data-testid="description" className="ml-6">
          {description}
        </AlertDescription>
      )}
    </AlertRoot>
  )
}
Alert.displayName = 'Alert'
