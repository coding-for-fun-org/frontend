import { type ReactNode } from 'react'

interface Stepper {
  value: number
  label: string
}

interface IStepperProps {
  title: ReactNode
  currentStep: number
  steps: Stepper[]
}

export const Stepper = ({ title, currentStep, steps }: IStepperProps) => {
  return (
    <div>
      <div>
        {title}
        <div>{steps[currentStep]!.label}</div>
      </div>
    </div>
  )
}
