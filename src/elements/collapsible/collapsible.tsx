'use client'

import {
  CollapsibleContent as RadixCollapsibleContent,
  CollapsibleTrigger as RadixCollapsibleTrigger,
  Root
} from '@radix-ui/react-collapsible'
import type { FC, ReactNode } from 'react'

const CollapsibleRoot = Root

const CollapsibleTrigger = RadixCollapsibleTrigger

const CollapsibleContent = RadixCollapsibleContent

interface ICollapsibleProps {
  trigger: ReactNode
  content: ReactNode
}

export const Collapsible: FC<ICollapsibleProps> = ({ trigger, content }) => {
  return (
    <CollapsibleRoot>
      <CollapsibleTrigger asChild>{trigger}</CollapsibleTrigger>
      <CollapsibleContent>{content}</CollapsibleContent>
    </CollapsibleRoot>
  )
}
Collapsible.displayName = 'Collapsible'
