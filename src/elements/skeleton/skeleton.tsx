import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

interface IVariantProps {
  variant: 'circle' | 'rect'
}

interface ISkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant: IVariantProps['variant']
}

export const Skeleton = ({ variant, className, ...props }: ISkeletonProps) => {
  const baseClasses = 'skeleton'
  const variantClasses: Record<Required<IVariantProps>['variant'], string> = {
    circle: 'variant--circle',
    rect: 'variant--rect'
  }

  return (
    <div
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  )
}
Skeleton.displayName = 'Skeleton'
