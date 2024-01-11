'use client'

import Link from 'next/link'
import type { FC } from 'react'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

export const HeaderTitleButton: FC = () => {
  const { translate } = useDictionary()

  return (
    <Link href={urlService.root.index()} className="font-bold">
      {translate('COMMON.APP_NAME')}
    </Link>
  )
}
