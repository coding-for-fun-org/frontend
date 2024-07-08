import type { FC } from 'react'

import { HeaderTitleButton } from '@/components/root/header-title-button/header-title-button'
import { LinkGithubIconButton } from '@/components/root/link-github-icon-button/link-github-icon-button'
import { ToggleLanguageIconButton } from '@/components/root/toggle-language-icon-button/toggle-language-icon-button'
import { ToggleThemeIconButton } from '@/components/root/toggle-theme-icon-button/toggle-theme-icon-button'

export const Header: FC = () => {
  return (
    <header className="sticky top-0 left-0 z-20 w-full border-b select-none shadow transition-colors bg-background">
      <div className="container h-14 flex items-center">
        <div className="flex flex-1 items-center space-x-2">
          <HeaderTitleButton />
        </div>
        <div className="flex flex-1 justify-end items-center space-x-2">
          <LinkGithubIconButton />
          <ToggleThemeIconButton />
          <ToggleLanguageIconButton />
        </div>
      </div>
    </header>
  )
}
