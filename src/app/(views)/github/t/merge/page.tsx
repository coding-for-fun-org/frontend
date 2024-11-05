'use client'

import { useState } from 'react'

import Stepper from '@/elements/root/stepper/stepper'

const mockSteps = [
  { value: 1, label: 'Select what you want to merge' },
  { value: 2, label: 'Sort the list and then submit' }
]

// just using a client component not to think too much about it
export default function Page() {
  const [currentStep, setCurrentStep] = useState(0)
  const handleStepClick = (value: number) => {
    setCurrentStep((prev) => prev + value)
  }
  return (
    <div>
      <h1>Merge page</h1>
      <Stepper
        currentStep={currentStep}
        steps={mockSteps}
        handleStepClick={handleStepClick}
      />
    </div>
  )
}
