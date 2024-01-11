'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { Button } from '@/elements/root/button/button'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'
import { useToggleTheme } from '@/contexts/root/theme-provider/theme-provider'

export const ToggleThemeIconButton = () => {
  const { translate } = useDictionary()
  const { toggleTheme } = useToggleTheme()

  return (
    <Tooltip
      trigger={
        <Button
          variant="ghost"
          size="icon"
          icon={
            <>
              <MoonIcon className="hidden dark:block w-full h-full" />
              <SunIcon className="block dark:hidden w-full h-full" />
            </>
          }
          onClick={() => {
            toggleTheme()
          }}
        ></Button>
      }
      content={<span>{translate('HEADER.TOGGLE_THEME_TOOLTIP')}</span>}
    />
  )
}
