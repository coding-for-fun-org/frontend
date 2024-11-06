'use client'

import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import Stepper from '@/elements/root/stepper/stepper'

const mockSteps = [
  { value: 1, label: 'Select what you want to merge' },
  { value: 2, label: 'Sort the list and then submit' }
]

// just using a client component not to think too much about it
export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const handleStepPrev = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleStepNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  return (
    <div>
      <h1>Merge page</h1>
      <Stepper currentStep={currentStep} steps={mockSteps} />
      <Button onClick={handleStepPrev} disabled={currentStep === 0}>
        Prev
      </Button>
      <Button
        onClick={handleStepNext}
        disabled={currentStep === mockSteps.length - 1}
      >
        Next
      </Button>
    </div>
  )
}
