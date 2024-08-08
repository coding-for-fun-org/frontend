'use client'

import { LanguagesIcon } from 'lucide-react'

import { Button } from '@/elements/root/button/button'
import { Dropdown } from '@/elements/root/dropdown/dropdown'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { EIsoLanguageCode } from '@/types/root/index'

type TToggleLanguageIconButtonProps = {
  language: EIsoLanguageCode
  setLanguage(this: void, lang: EIsoLanguageCode): Promise<void>
}

export const ToggleLanguageIconButton = ({
  language,
  setLanguage
}: TToggleLanguageIconButtonProps) => {
  const { translate } = useDictionary()
  const values = [
    {
      label: translate('HEADER.TOGGLE_LANGUAGE_ENG'),
      value: EIsoLanguageCode.ENGLISH
    },
    {
      label: translate('HEADER.TOGGLE_LANGUAGE_KOR'),
      value: EIsoLanguageCode.KOREAN
    }
  ]

  const handleValueChange = (value: string) => {
    switch (value as EIsoLanguageCode) {
      case EIsoLanguageCode.ENGLISH: {
        setLanguage(EIsoLanguageCode.ENGLISH).catch(console.error)
        break
      }

      case EIsoLanguageCode.KOREAN: {
        setLanguage(EIsoLanguageCode.KOREAN).catch(console.error)
        break
      }
    }
  }

  return (
    <Dropdown
      type="radio"
      data={{
        groups: [{ label: '', items: values }],
        value: language,
        onValueChange: handleValueChange
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        icon={
          <Tooltip tooltip={translate('HEADER.TOGGLE_LANGUAGE_TOOLTIP')}>
            <LanguagesIcon className="w-full h-full" />
          </Tooltip>
        }
      />
    </Dropdown>
  )
}
