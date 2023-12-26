import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface IVariantProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'error'
    | 'outline'
    | 'ghost'
    | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IVariantProps {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const basicClasses = 'button'
    const variantClasses: Record<Required<IVariantProps>['variant'], string> = {
      primary: 'variant--primary',
      secondary: 'variant--secondary',
      success: 'variant--success',
      info: 'variant--info',
      error: 'variant--error',
      outline: 'variant--outline',
      ghost: 'variant--ghost',
      link: 'variant--link'
    }
    const sizeClasses: Record<Required<IVariantProps>['size'], string> = {
      sm: 'size--sm',
      md: 'size--md',
      lg: 'size--lg',
      icon: 'size--icon'
    }
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={clsx(
          basicClasses,
          variantClasses[variant ?? 'primary'],
          sizeClasses[size ?? 'md'],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
