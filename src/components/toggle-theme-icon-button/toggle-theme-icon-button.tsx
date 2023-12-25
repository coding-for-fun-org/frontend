'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { Button } from '@/elements/root/button/button'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider'
import { useToggleTheme } from '@/contexts/root/theme-provider'

export const ToggleThemeIconButton = () => {
  const { dictionary } = useDictionary()
  const { toggleTheme } = useToggleTheme()

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            toggleTheme()
          }}
        >
          {
            <MoonIcon
              width="16"
              height="16"
              className="absolute hidden dark:block"
            />
          }
          {
            <SunIcon
              width="16"
              height="16"
              className="absolute block dark:hidden"
            />
          }
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <span>{dictionary.HEADER.TOGGLE_THEME_TOOLTIP}</span>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
