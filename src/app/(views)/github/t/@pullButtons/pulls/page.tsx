'use client'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

export default function Page() {
  const { translate } = useDictionary()
  return (
    <div>
      <Button type="button" label={translate('GITHUB.EXPAND_ALL_BUTTON')} />
      <Button type="button" label={translate('GITHUB.START_REVIEW_BUTTON')} />
    </div>
  )
}
