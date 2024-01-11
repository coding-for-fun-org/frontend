'use client'

import Link from 'next/link'
import type { FC } from 'react'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

export const HeaderTitleButton: FC = () => {
  const { dictionary } = useDictionary()

  return (
    <Link href={urlService.root.index()} className="font-bold">
      {dictionary.COMMON.APP_NAME}
    </Link>
  )
}
