import { Button } from '@/elements/root/button/button'

interface Stepper {
  value: number
  label: string
}

interface IStepperProps {
  currentStep: number
  steps: Stepper[]
  handleStepClick: (value: number) => void
}

const Stepper = ({ currentStep, steps, handleStepClick }: IStepperProps) => {
  const handleToPrevious = () => {
    if (currentStep > 0) {
      handleStepClick(-1)
    }
  }

  return (
    <div>
      <>
        <div>
          <h3>Step {steps[currentStep]!.value}</h3>
          <div>{steps[currentStep]!.label}</div>
        </div>
        <div>
          <Button onClick={handleToPrevious} disabled={currentStep === 0}>
            Previous
          </Button>
        </div>
      </>
    </div>
  )
}

export default Stepper
