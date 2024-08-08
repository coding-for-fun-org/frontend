'use client'

import {
  CheckboxItem,
  Content, // Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator, // Sub,
  SubContent,
  SubTrigger,
  Trigger
} from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { Check, ChevronRightIcon, CircleIcon } from 'lucide-react'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
  forwardRef
} from 'react'

const DropdownMenu = Root

const DropdownMenuTrigger = Trigger

// const DropdownMenuGroup = Group

const DropdownMenuPortal = Portal

// const DropdownMenuSub = Sub

const DropdownMenuRadioGroup = RadioGroup

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={clsx(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </SubTrigger>
))
DropdownMenuSubTrigger.displayName = SubTrigger.displayName

const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof SubContent>,
  ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => (
  <SubContent
    ref={ref}
    className={clsx(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = SubContent.displayName

const DropdownMenuContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={clsx(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </Portal>
))
DropdownMenuContent.displayName = Content.displayName

const DropdownMenuItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <Item
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = Item.displayName

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof CheckboxItem>,
  ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Check className="h-4 w-4" />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <CircleIcon className="h-2 w-2 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
))
DropdownMenuRadioItem.displayName = RadioItem.displayName

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <Label
    ref={ref}
    className={clsx(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = Label.displayName

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={clsx('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={clsx('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

type TDropdownCheckboxValue = {
  label: string
  value: string
  checked: boolean
  onCheckedChange(this: void, checked: boolean): void
  disabled?: boolean
}

type TDropdownCheckboxGroup = {
  label: string
  items: TDropdownCheckboxValue[]
}

type TDropdownCheckboxData = {
  groups: TDropdownCheckboxGroup[]
  closeOnSelect?: boolean
}

type TDropdownRadioValue = {
  label: string
  value: string
  disabled?: boolean
}

type TDropdownRadioGroup = {
  label: string
  items: TDropdownRadioValue[]
}

type TDropdownRadioData = {
  groups: TDropdownRadioGroup[]
  value: string
  onValueChange(this: void, value: string): void
  closeOnSelect?: boolean
}

type TDropdownType = 'checkbox' | 'radio' // | 'default'

type TDropdowData<T extends TDropdownType> = T extends 'checkbox'
  ? TDropdownCheckboxData
  : T extends 'radio'
    ? TDropdownRadioData
    : never

type TCustomProps<T extends TDropdownType> = {
  type: T
  data: TDropdowData<T>
  children: ReactNode
  contentClassName?: string
  closeOnSelect?: boolean
}

type TDropdownCheckboxGroupsProps = TDropdownCheckboxData

const DropdownCheckboxGroups = ({
  groups,
  closeOnSelect
}: TDropdownCheckboxGroupsProps) => {
  return (
    <>
      {groups.map(({ label: groupLabel, items }, index) => {
        return (
          <div key={groupLabel}>
            {groupLabel && <DropdownMenuLabel>{groupLabel}</DropdownMenuLabel>}
            {(index > 0 || (groupLabel && index === 0)) && (
              <DropdownMenuSeparator />
            )}
            {items.map(
              ({ label: itemLabel, checked, onCheckedChange, disabled }) => (
                <DropdownMenuCheckboxItem
                  key={itemLabel}
                  checked={checked}
                  onCheckedChange={onCheckedChange}
                  disabled={disabled}
                  onSelect={(event) => {
                    if (!closeOnSelect) {
                      event.preventDefault()
                    }
                  }}
                >
                  {itemLabel}
                </DropdownMenuCheckboxItem>
              )
            )}
          </div>
        )
      })}
    </>
  )
}

type TDropdownRadioGroupsProps = TDropdownRadioData

const DropdownRadioGroups = ({
  groups,
  value: selectedValue,
  onValueChange,
  closeOnSelect
}: TDropdownRadioGroupsProps) => {
  return (
    <>
      {groups.map(({ label: groupLabel, items }, index) => {
        return (
          <div key={groupLabel}>
            {groupLabel && <DropdownMenuLabel>{groupLabel}</DropdownMenuLabel>}
            {(index > 0 || (groupLabel && index === 0)) && (
              <DropdownMenuSeparator />
            )}
            <DropdownMenuRadioGroup
              value={selectedValue}
              onValueChange={onValueChange}
            >
              {items.map(({ label: itemLabel, value, disabled }) => (
                <DropdownMenuRadioItem
                  key={itemLabel}
                  value={value}
                  disabled={disabled}
                  onSelect={(event) => {
                    if (!closeOnSelect) {
                      event.preventDefault()
                    }
                  }}
                >
                  {itemLabel}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </div>
        )
      })}
    </>
  )
}

type TDropdownProps<T extends TDropdownType> = TCustomProps<T>

export const Dropdown = <T extends TDropdownType>({
  type,
  data,
  children,
  contentClassName,
  closeOnSelect = true
}: TDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className={contentClassName}>
          {type === 'checkbox' ? (
            <DropdownCheckboxGroups
              {...(data as TDropdownCheckboxData)}
              closeOnSelect={closeOnSelect}
            />
          ) : null}

          {type === 'radio' ? (
            <DropdownRadioGroups
              {...(data as TDropdownRadioData)}
              closeOnSelect={closeOnSelect}
            />
          ) : null}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
Dropdown.displayName = 'Dropdown'
