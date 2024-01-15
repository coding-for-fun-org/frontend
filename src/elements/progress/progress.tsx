'use client'

import { Indicator, Root } from '@radix-ui/react-progress'
import clsx from 'clsx'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  forwardRef
} from 'react'

const DEFAULT_MAX = 100

const ProgressRoot = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={clsx(
      'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
      className
    )}
    {...props}
  />
))
ProgressRoot.displayName = Root.displayName

const ProgressIndicator = forwardRef<
  ElementRef<typeof Indicator>,
  ComponentPropsWithoutRef<typeof Indicator>
>(({ className, ...props }, ref) => (
  <Indicator
    ref={ref}
    className={clsx(
      'h-full w-full flex-1 bg-primary transition-all',
      className
    )}
    {...props}
  />
))
ProgressIndicator.displayName = Indicator.displayName

type TCustomProps = {
  value: number
  max?: number
}

type TProgressProps = Omit<HTMLAttributes<HTMLDivElement>, keyof TCustomProps> &
  TCustomProps

export const Progress = ({
  value,
  max = DEFAULT_MAX,
  ...props
}: TProgressProps) => {
  const translateXValue = max - (value ?? 0)

  return (
    <ProgressRoot value={value < max ? value : max} max={max} {...props}>
      <ProgressIndicator
        data-testid="progress-indicator"
        style={{
          transform: `translateX(-${translateXValue > 0 ? translateXValue : 0}%)`
        }}
      />
    </ProgressRoot>
  )
}
