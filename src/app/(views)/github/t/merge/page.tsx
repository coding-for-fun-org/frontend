'use client'

import Stepper from '@/elements/root/stepper/stepper'

const mockSteps = [
  { id: 1, text: 'Select what you want to merge' },
  { id: 2, text: 'Sort the list and then submit' }
]

// just using a client component not to think too much about it
export default function Page() {
  return (
    <div>
      <h1>Merge page</h1>
      <Stepper steps={mockSteps} />
    </div>
  )
}
