'use client'

import { Root } from '@radix-ui/react-label'
import clsx from 'clsx'
import type { LabelHTMLAttributes } from 'react'

export const Label = ({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => {
  const basicClasses =
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'

  return <Root className={clsx(basicClasses, className)} {...props} />
}
Label.displayName = Root.displayName
