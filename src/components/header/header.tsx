import type { FC } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/elements/root/dropdown-menu/dropdown-menu'

import { HeaderTitleButton } from '@/components/root/header-title-button/header-title-button'
import { LinkGithubIconButton } from '@/components/root/link-github-icon-button/link-github-icon-button'
import { ToggleThemeIconButton } from '@/components/root/toggle-theme-icon-button/toggle-theme-icon-button'

export const Header: FC = () => {
  return (
    <header className="sticky top-0 left-0 z-20 w-full border-b select-none shadow transition-colors bg-background">
      <div className="container h-14 flex items-center">
        <div className="flex flex-1 items-center space-x-2">
          <HeaderTitleButton />
        </div>
        <div className="flex flex-1 justify-end items-center space-x-2">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                DropdownMenu
                <DropdownMenuContent>
                  <DropdownMenuLabel>label</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Item1</DropdownMenuItem>
                  <DropdownMenuItem>Item2</DropdownMenuItem>
                  <DropdownMenuItem>Item3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
          <LinkGithubIconButton />

          <ToggleThemeIconButton />
        </div>
      </div>
    </header>
  )
}
