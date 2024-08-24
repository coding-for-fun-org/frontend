import {
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

import { ELocalStorageKey } from '@/types/root/index'

import { type TGithubInstallation } from '@/types/github/root/index'

export interface FilterContextType {
  filterValue: string | null
  setFilterValue: Dispatch<SetStateAction<string | null>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

interface FilterProviderProps {
  children: ReactNode
  installations: TGithubInstallation[]
}

export const FilterProvider: FC<FilterProviderProps> = ({
  children,
  installations
}) => {
  const [filterValue, setFilterValue] = useState<string | null>(() => {
    if (installations.length === 0) {
      return null
    }

    const targetInstallation = installations.find(
      (installation) =>
        String(installation.id) ===
        localStorage.getItem(ELocalStorageKey.INSTALLATION_ID)
    )

    if (targetInstallation === undefined) {
      return String(installations[0]!.id)
    }

    return String(targetInstallation.id)
  })
  return (
    <FilterContext.Provider value={{ filterValue, setFilterValue }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterChange = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilterChange must be used within a FilterProvider')
  }
  return context
}
