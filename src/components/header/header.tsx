import type { FC } from 'react'

import { HeaderTitleButton } from '@/components/root/header-title-button/header-title-button'
import { LinkGithubIconButton } from '@/components/root/link-github-icon-button/link-github-icon-button'
import { ToggleLanguageIconButton } from '@/components/root/toggle-language-icon-button/toggle-language-icon-button'
import { ToggleThemeIconButton } from '@/components/root/toggle-theme-icon-button/toggle-theme-icon-button'

import { setLanguage } from '@/utils/root/language.server'

import { type EIsoLanguageCode } from '@/types/root/index'

type THeaderProps = {
  language: EIsoLanguageCode
}

export const Header: FC<THeaderProps> = ({ language }) => {
  return (
    <header className="container w-screen border-b select-none shadow transition-colors bg-background box-border h-header">
      <div className="flex items-center h-full">
        <div className="flex flex-1 items-center space-x-2">
          <HeaderTitleButton />
        </div>
        <div className="flex flex-1 justify-end items-center space-x-2">
          <LinkGithubIconButton />
          <ToggleThemeIconButton />
          <ToggleLanguageIconButton
            language={language}
            setLanguage={setLanguage}
          />
        </div>
      </div>
    </header>
  )
}
