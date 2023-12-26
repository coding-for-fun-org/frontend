import clsx from 'clsx'
import type { FC, HTMLAttributes } from 'react'

interface IVariantProps {
  variant: 'circle' | 'rect'
}

interface ISkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant: IVariantProps['variant']
}

const Skeleton: FC<ISkeletonProps> = ({ variant, className, ...props }) => {
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

export { Skeleton }
