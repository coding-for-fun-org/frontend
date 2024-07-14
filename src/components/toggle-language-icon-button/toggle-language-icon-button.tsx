'use client'

import { LanguagesIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dropdown } from '@/elements/root/dropdown/dropdown'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { getLanguage, setLanguage } from '@/utils/root/language'

import { EIsoLanguageCode } from '@/types/root/index'

export const ToggleLanguageIconButton = () => {
  const { translate } = useDictionary()
  const [dropdownRadioValue, setDropdownRadioValue] = useState(getLanguage())
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
    switch (value) {
      case String(EIsoLanguageCode.ENGLISH):
        setDropdownRadioValue(EIsoLanguageCode.ENGLISH)
        setLanguage(EIsoLanguageCode.ENGLISH)
        document.documentElement.lang = EIsoLanguageCode.ENGLISH
        break

      case String(EIsoLanguageCode.KOREAN):
        setDropdownRadioValue(EIsoLanguageCode.KOREAN)
        setLanguage(EIsoLanguageCode.KOREAN)
        document.documentElement.lang = EIsoLanguageCode.KOREAN
        break
    }
  }

  return (
    <>
      <Dropdown
        type="radio"
        data={{
          groups: [{ label: dropdownRadioValue, items: values }],
          value: dropdownRadioValue,
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
    </>
  )
}
