'use client'

import { Fallback, Root } from '@radix-ui/react-avatar'
import clsx from 'clsx'
import Image from 'next/image'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  forwardRef
} from 'react'

const AvatarRoot = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={clsx(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
))
AvatarRoot.displayName = Root.displayName

const AvatarImage = forwardRef<
  ElementRef<typeof Image>,
  ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => (
  <Image
    ref={ref}
    className={clsx('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = Image.displayName

const AvatarFallback = forwardRef<
  React.ElementRef<typeof Fallback>,
  React.ComponentPropsWithoutRef<typeof Fallback>
>(({ className, ...props }, ref) => (
  <Fallback
    ref={ref}
    className={clsx(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = Fallback.displayName

type TCustomProps = {
  src: string
  fallback: string
}

type TAvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, keyof TCustomProps> &
  TCustomProps

export const Avatar = ({ src, fallback, ...props }: TAvatarProps) => {
  return (
    <AvatarRoot {...props}>
      <AvatarImage src={src} fill={true} alt={fallback} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarRoot>
  )
}
Avatar.displayName = 'Avatar'
