import { type ReactNode } from 'react'

import { useInstallations } from '@/components/github/root/connections/hooks'

import { FilterProvider } from '@/contexts/github/root/filter-provider/filter-provider'

interface IFilterProviderWidhInstallations {
  children: ReactNode
}

export const FilterProviderWidhInstallations = ({
  children
}: IFilterProviderWidhInstallations) => {
  const { installations } = useInstallations()

  if (!installations) {
    return
  }

  return (
    <FilterProvider installations={installations}>{children}</FilterProvider>
  )
}
