import { type ReactNode } from 'react'

interface Stepper {
  value: number
  label: string
}

interface IStepperProps {
  children: ReactNode
  currentStep: number
  steps: Stepper[]
}

export const Stepper = ({ children, currentStep, steps }: IStepperProps) => {
  return (
    <div>
      <div>
        {children}
        <div>{steps[currentStep]!.value}</div>
        <div>{steps[currentStep]!.label}</div>
      </div>
    </div>
  )
}
