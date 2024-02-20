'use client'

import { useState } from 'react'

import { RadioGroup } from '@/elements/root/radio-group/radio-group'

export default function Page() {
  const [value, setValue] = useState('3')
  const values = [
    {
      value: '1',
      label: 'Test 1'
    },
    {
      value: '2',
      label: 'Test 2'
    },
    {
      value: '3',
      label: 'Test 3'
    }
  ]

  return (
    <div>
      <h4>radio group example</h4>

      <div className="mt-3"></div>

      <RadioGroup
        className="flex-col"
        value={value}
        onValueChange={setValue}
        values={values}
      />
    </div>
  )
}
