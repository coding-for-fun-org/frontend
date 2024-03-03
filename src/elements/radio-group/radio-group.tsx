'use client'

import { Indicator, Item, Root } from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import { Circle } from 'lucide-react'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  forwardRef,
  useId
} from 'react'

import { Label } from '@/elements/root/label/label'

const RadioGroupRoot = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  return <Root className={clsx('flex gap-2', className)} {...props} ref={ref} />
})
RadioGroupRoot.displayName = Root.displayName

const RadioGroupItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={clsx(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </Indicator>
    </Item>
  )
})
RadioGroupItem.displayName = Item.displayName

type TRadioValue = {
  label: string
  value: string
}

type TCustomProps = {
  values: TRadioValue[]
  value: string
  onValueChange(value: string): void
}

type TRadioGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  // I do not need 'defaultValue' and 'dir' in my component
  keyof TCustomProps | 'defaultValue' | 'dir'
> &
  TCustomProps

export const RadioGroup = ({
  values,
  value,
  onValueChange,
  ...props
}: TRadioGroupProps) => {
  const radioId = useId()

  return (
    <RadioGroupRoot value={value} onValueChange={onValueChange} {...props}>
      {values.map((v) => (
        <div
          key={`${radioId}-${v.value}`}
          className="flex items-center space-x-2"
        >
          <RadioGroupItem
            data-testid={`radio-group-item-${v.value}`}
            id={`${radioId}-${v.value}`}
            className="cursor-pointer"
            value={v.value}
          />
          <Label htmlFor={`${radioId}-${v.value}`} className="cursor-pointer">
            {v.label}
          </Label>
        </div>
      ))}
    </RadioGroupRoot>
  )
}
