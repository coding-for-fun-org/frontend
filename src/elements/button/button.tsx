import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import {
  type ButtonHTMLAttributes,
  type FC,
  type ReactNode,
  forwardRef
} from 'react'

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

type TButtonLoaderProps = {
  size: IVariantProps['size']
}

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  (
    | (IVariantProps & {
        asChild?: true
        label?: never
        loading?: never
        icon?: never
      })
    | (Omit<IVariantProps, 'size'> & {
        asChild?: false
        loading?: boolean
      } & (
          | {
              size?: Exclude<IVariantProps['size'], 'icon'>
              icon?: ReactNode
              label: ReactNode
            }
          | {
              size: 'icon'
              icon: ReactNode
              label?: never
            }
        ))
  )

const ButtonLoader: FC<TButtonLoaderProps> = ({ size }) => {
  const basicClasses = 'loader'
  const sizeClasses: Record<Required<IVariantProps>['size'], string> = {
    sm: 'size--sm',
    md: 'size--md',
    lg: 'size--lg',
    icon: 'size--icon'
  }
  return (
    <svg
      className={clsx(basicClasses, sizeClasses[size ?? 'md'])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

/**
 * @description
 * Please check the following condition of props:
 * 1. If asChild is true, label, loading and icon must be undefined
 * 2. If asChild is false,
 *   2-1. If size is 'icon', label must be undefined
 *   2-2. If size is not 'icon', label must be defined
 */
export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      label,
      icon,
      loading,
      ...props
    },
    ref
  ) => {
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
        disabled={!!loading}
        ref={ref}
        {...props}
      >
        <>
          {!children && !asChild && (
            <span className="gap-4 flex items-center">
              {!!loading && <ButtonLoader size={size} />}
              {/* If size is icon and loading is true, do not display icon */}
              {!!icon && !(loading && size === 'icon') && (
                <span className="icon">{icon}</span>
              )}
              {/* @ts-expect-error - I know size can't be 'icon' by typescript but I put this condition to make sure programatically */}
              {!!label && size !== 'icon' && (
                <span className="label">{label}</span>
              )}
            </span>
          )}
          {children}
        </>
      </Comp>
    )
  }
)
Button.displayName = 'Button'
