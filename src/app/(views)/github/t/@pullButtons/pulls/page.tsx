'use client'

import { Button } from '@/elements/root/button/button'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { useUpdateRepoOrPull } from '@/contexts/github/root/selected-pulls-provider'

export default function Page() {
  const { translate } = useDictionary()
  const { openAllRepo } = useUpdateRepoOrPull()

  const handleExpandAllClick = () => {
    openAllRepo()
  }
  return (
    <div className="flex gap-4 h-fit">
      <Button
        type="button"
        label={translate('GITHUB.EXPAND_ALL_BUTTON')}
        onClick={handleExpandAllClick}
      />
      <Button type="button" label={translate('GITHUB.START_REVIEW_BUTTON')} />
    </div>
  )
}
