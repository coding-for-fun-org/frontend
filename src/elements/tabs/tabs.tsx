'use client'

import { Content, List, Root, Trigger } from '@radix-ui/react-tabs'
import clsx from 'clsx'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FC,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  memo
} from 'react'

const TabsRoot = Root

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

interface ITabValue {
  label: string
  value: string
  children: ReactNode
  memo?: boolean
}

const _Trigger: FC<Pick<ITabValue, 'label' | 'value'>> = ({ label, value }) => (
  <TabsTrigger value={value}>{label}</TabsTrigger>
)
_Trigger.displayName = Trigger.displayName

const _MemoTrigger = memo(_Trigger)
_MemoTrigger.displayName = Trigger.displayName

const _Content: FC<Pick<ITabValue, 'value' | 'children'>> = ({
  value,
  children
}) => <TabsContent value={value}>{children}</TabsContent>
_Content.displayName = Content.displayName

const _MemoContent = memo(_Content)
_MemoContent.displayName = Content.displayName

interface ITabsProps extends ComponentPropsWithoutRef<typeof Root> {
  defaultValue: string
  values: ITabValue[]
}

export const Tabs: FC<ITabsProps> = ({
  defaultValue,
  values,
  className,
  ...props
}) => {
  return (
    <TabsRoot
      defaultValue={defaultValue}
      className={clsx('relative', className)}
      {...props}
    >
      <TabsList>
        {values.map(({ label, value, memo }) =>
          !!memo ? (
            <_MemoTrigger key={value} label={label} value={value} />
          ) : (
            <_Trigger key={value} label={label} value={value} />
          )
        )}
      </TabsList>
      {values.map(({ value, children, memo }) =>
        !!memo ? (
          <_MemoContent key={value} value={value}>
            {children}
          </_MemoContent>
        ) : (
          <_Content key={value} value={value}>
            {children}
          </_Content>
        )
      )}
    </TabsRoot>
  )
}
Tabs.displayName = 'Tabs'
