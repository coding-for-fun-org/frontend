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

export interface FilterContextType {
  filterValue: string | null
  setFilterValue: Dispatch<SetStateAction<string | null>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider: FC<FilterProviderProps> = ({ children }) => {
  const [filterValue, setFilterValue] = useState<string | null>(
    localStorage.getItem(ELocalStorageKey.INSTALLATION_ID)
  )
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
