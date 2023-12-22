'use client'

import { Root } from '@radix-ui/react-label'
import clsx from 'clsx'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef
} from 'react'

const Label = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  const basicClasses =
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'

  return <Root ref={ref} className={clsx(basicClasses, className)} {...props} />
})
Label.displayName = Root.displayName

export { Label }
