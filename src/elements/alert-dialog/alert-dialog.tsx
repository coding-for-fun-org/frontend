'use client'

import type { FC, ReactNode } from 'react'

import { useDictionary } from '@/contexts/root/dictionary-provider'

import {
  _AlertDialogAction,
  _AlertDialogCancel,
  _AlertDialogContent,
  _AlertDialogDescription,
  _AlertDialogFooter,
  _AlertDialogHeader,
  _AlertDialogRoot,
  _AlertDialogTitle,
  _AlertDialogTrigger
} from './_alert-dialog'

interface IAlertDialogBodyProps {
  title: string
  description: string
  cancelLabel?: string
  actionLabel?: string
  children?: ReactNode
}

const AlertDialogBody: FC<IAlertDialogBodyProps> = ({
  title,
  description,
  cancelLabel,
  actionLabel,
  children
}) => {
  const { dictionary } = useDictionary()

  return (
    <_AlertDialogContent>
      <_AlertDialogHeader>
        <_AlertDialogTitle>{title}</_AlertDialogTitle>
        <_AlertDialogDescription>{description}</_AlertDialogDescription>
        {children}
      </_AlertDialogHeader>
      <_AlertDialogFooter>
        <_AlertDialogCancel>
          {cancelLabel ?? dictionary.DIALOG_BUTTON.CANCEL}
        </_AlertDialogCancel>
        <_AlertDialogAction>
          {actionLabel ?? dictionary.DIALOG_BUTTON.CONTINUE}
        </_AlertDialogAction>
      </_AlertDialogFooter>
    </_AlertDialogContent>
  )
}
AlertDialogBody.displayName = 'AlertDialogBody'

export const AlertDialog = {
  Root: _AlertDialogRoot,
  Trigger: _AlertDialogTrigger,
  Body: AlertDialogBody
}
