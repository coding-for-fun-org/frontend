'use client'

import { LanguagesIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dropdown } from '@/elements/root/dropdown/dropdown'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

export const ToggleLanguageIconButton = () => {
  const { translate } = useDictionary()
  const [dropdownRadioValue, setDropdownRadioValue] = useState('1')
  const values = [
    {
      label: translate('HEADER.TOGGLE_LANGUAGE_ENG'),
      value: '1'
    },
    {
      label: translate('HEADER.TOGGLE_LANGUAGE_KOR'),
      value: '2'
    }
  ]

  return (
    <Dropdown
      type="radio"
      data={{
        groups: [{ label: 'What do you want, Languages?', items: values }],
        value: dropdownRadioValue,
        onValueChange: setDropdownRadioValue
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
