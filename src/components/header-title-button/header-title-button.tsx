'use client'

import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/root/ui/button/button'

import { useDictionary } from '@/contexts/root/DictionaryProvider'

export const HeaderTitleButton: FC = () => {
  const { dictionary } = useDictionary()

  return (
    <Button asChild variant="link" className="font-bold hover:no-underline">
      <Link href="/">{dictionary.COMMOM.APP_NAME}</Link>
    </Button>
  )
}
