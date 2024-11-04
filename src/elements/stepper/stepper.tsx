import { useState } from 'react'

import { Button } from '@/elements/root/button/button'

interface Stepper {
  id: number
  text: string
}

interface IStepperProps {
  steps: Stepper[]
}
const Stepper = ({ steps }: IStepperProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const cureentStepLastIndex = steps.length - 1

  const handleToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleToNext = () => {
    if (currentStep < cureentStepLastIndex) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleToSubmit = () => {
    console.log('run handleToSubmit()')
  }

  return (
    <div>
      {steps[currentStep] ? (
        <>
          <div>
            <h3>Step {steps[currentStep].id}</h3>
            <div>{steps[currentStep].text}</div>
          </div>
          <div>
            <Button onClick={handleToPrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            {currentStep !== cureentStepLastIndex ? (
              <Button onClick={handleToNext}>Next</Button>
            ) : (
              <Button onClick={handleToSubmit}>Submit</Button>
            )}
          </div>
        </>
      ) : (
        <p>Invalid step</p>
      )}
    </div>
  )
}

export default Stepper
