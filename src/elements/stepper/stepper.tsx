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
      <>
        <div>
          <h3>Step {steps[currentStep]!.value}</h3>
          <div>{steps[currentStep]!.label}</div>
        </div>
      </>
    </div>
  )
}
