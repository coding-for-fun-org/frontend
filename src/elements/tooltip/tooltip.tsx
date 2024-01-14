'use client'

import { Content, Root, Trigger } from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
  forwardRef
} from 'react'

const TooltipRoot = Root

const TooltipTrigger = Trigger

const TooltipContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Content
    ref={ref}
    sideOffset={sideOffset}
    className={clsx(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = Content.displayName

type TCustomProps = {
  tooltip: ReactNode
  children: ReactNode
  // The duration from when the mouse enters a tooltip trigger until the tooltip opens.
  delayDuration?: number
}

type TTooltipProps = TCustomProps

const DEFAULT_TOOLTIP_DELAY_DURATION = 500

export function Tooltip({
  tooltip,
  children,
  delayDuration,
  ...props
}: TTooltipProps) {
  return (
    <TooltipRoot
      delayDuration={delayDuration ?? DEFAULT_TOOLTIP_DELAY_DURATION}
      {...props}
    >
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </TooltipRoot>
  )
}
Tooltip.displayName = 'Tooltip'
