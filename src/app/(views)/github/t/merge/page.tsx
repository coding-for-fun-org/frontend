'use client'

import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Stepper } from '@/elements/root/stepper/stepper'

// just using a client component not to think too much about it
const mockData = [
  { value: 0, label: 'Introduction' },
  { value: 1, label: 'Details' },
  { value: 2, label: 'Confirmation' }
]

export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const handlePrevClick = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1)
  }

  return (
    <div>
      <h1>Merge page</h1>
      <Stepper
        title={<h2>Step</h2>}
        currentStep={currentStep}
        steps={mockData}
      />
      <Button onClick={handlePrevClick}>Prev</Button>
      <Button onClick={handleNextClick}>Next</Button>
    </div>
  )
}
