interface Stepper {
  value: number
  label: string
}

interface IStepperProps {
  currentStep: number
  steps: Stepper[]
}

export const Stepper = ({ currentStep, steps }: IStepperProps) => {
  return (
    <div>
      <div>
        <div>{steps[currentStep]!.label}</div>
      </div>
    </div>
  )
}
