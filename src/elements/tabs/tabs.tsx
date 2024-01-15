'use client'

import { Content, List, Root, Trigger } from '@radix-ui/react-tabs'
import clsx from 'clsx'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
  forwardRef
} from 'react'

const TabsRoot = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root ref={ref} className={clsx('relative', className)} {...props} />
))
TabsRoot.displayName = Root.displayName

const TabsList = forwardRef<
  ElementRef<typeof List>,
  ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={clsx(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
))
TabsList.displayName = List.displayName

const TabsTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={clsx(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = Trigger.displayName

const TabsContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={clsx(
      'mt-2 h-[calc(100%-theme(space.10)-theme(space.2))] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = Content.displayName

type TTabValue = {
  label: string
  value: string
  children: ReactNode
}

type TCustomProps = {
  values: TTabValue[]
  value: string
  onValueChange(value: string): void
}

type TTabsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  // I do not need 'defaultValue' and 'dir' in my component
  keyof TCustomProps | 'defaultValue' | 'dir'
> &
  TCustomProps

export const Tabs = ({
  values,
  value,
  onValueChange,
  ...props
}: TTabsProps) => {
  return (
    <TabsRoot
      data-testid="tabs-root"
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      <TabsList data-testid="tabs-list">
        {values.map(({ label, value }) => (
          <TabsTrigger data-testid="tabs-trigger" key={value} value={value}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {values.map(({ value, children }) => (
        <TabsContent data-testid="tabs-content" key={value} value={value}>
          {children}
        </TabsContent>
      ))}
    </TabsRoot>
  )
}
Tabs.displayName = 'Tabs'
