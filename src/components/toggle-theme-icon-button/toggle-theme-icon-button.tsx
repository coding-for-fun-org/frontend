'use client'

import { MoonStarIcon, SunIcon } from 'lucide-react'

import { Button } from '@/elements/root/button/button'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'
import { useToggleTheme } from '@/contexts/root/theme-provider/theme-provider'

export const ToggleThemeIconButton = () => {
  const { translate } = useDictionary()
  const { toggleTheme } = useToggleTheme()

  return (
    <Tooltip tooltip={translate('HEADER.TOGGLE_THEME_TOOLTIP')}>
      <Button
        variant="ghost"
        size="icon"
        icon={
          <>
            <MoonStarIcon className="hidden dark:block w-full h-full" />
            <SunIcon className="block dark:hidden w-full h-full" />
          </>
        }
        onClick={() => {
          toggleTheme()
        }}
      />
    </Tooltip>
  )
}
