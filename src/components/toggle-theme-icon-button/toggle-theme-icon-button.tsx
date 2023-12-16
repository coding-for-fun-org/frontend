'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/root/ui/button/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/root/ui/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/DictionaryProvider'
import { useTheme, useToggleTheme } from '@/contexts/root/ThemeProvider'

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
