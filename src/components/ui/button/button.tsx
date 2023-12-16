import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { forwardRef } from 'react'

interface VariantProps {
  variant?:
    | 'default'
    | 'secondary'
    | 'success'
    | 'info'
    | 'error'
    | 'outline'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const basicClasses =
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    const variantClasses: Record<Required<VariantProps>['variant'], string> = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      success: 'bg-success text-success-foreground hover:bg-success/90',
      info: 'bg-info text-info-foreground hover:bg-info/90',
      error: 'bg-error text-error-foreground hover:bg-error/90',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'underline-offset-4 hover:underline'
    }
    const sizeClasses: Record<Required<VariantProps>['size'], string> = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10'
    }
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={clsx(
          basicClasses,
          variantClasses[variant ?? 'default'],
          sizeClasses[size ?? 'default'],
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
