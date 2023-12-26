import {
  CheckCircledIcon,
  CrossCircledIcon,
  DrawingPinIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons'
import type { FC, ReactNode } from 'react'

import {
  type IVariantProps,
  _AlertDescription,
  _AlertRoot,
  _AlertTitle
} from './_alert'

interface AlertProps extends IVariantProps {
  title: ReactNode
  description: ReactNode
}

export const Alert: FC<AlertProps> = ({ variant, title, description }) => {
  return (
    <_AlertRoot variant={variant}>
      {(variant === undefined || variant === 'primary') && (
        <DrawingPinIcon className="h-4 w-4" />
      )}
      {variant === 'success' && <CheckCircledIcon className="h-4 w-4" />}
      {variant === 'info' && <InfoCircledIcon className="h-4 w-4" />}
      {variant === 'error' && <CrossCircledIcon className="h-4 w-4" />}
      <_AlertTitle>{title}</_AlertTitle>
      <_AlertDescription>{description}</_AlertDescription>
    </_AlertRoot>
  )
}
