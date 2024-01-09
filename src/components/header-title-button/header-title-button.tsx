'use client'

import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

export const HeaderTitleButton: FC = () => {
  const { dictionary } = useDictionary()

  return (
    <Button asChild variant="link" className="font-bold hover:no-underline">
      <Link href={urlService.root.index()}>{dictionary.COMMON.APP_NAME}</Link>
    </Button>
  )
}
