'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { Button } from '@/elements/root/button/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider'
import { useTheme, useToggleTheme } from '@/contexts/root/theme-provider'

export const ToggleThemeIconButton = () => {
  const { dictionary } = useDictionary()
  const { isDarkMode } = useTheme()
  const { toggleTheme } = useToggleTheme()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            toggleTheme()
          }}
        >
          {isDarkMode && <MoonIcon width="16" height="16" />}
          {!isDarkMode && <SunIcon width="16" height="16" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{dictionary.HEADER.TOGGLE_THEME_TOOLTIP}</span>
      </TooltipContent>
    </Tooltip>
  )
}
