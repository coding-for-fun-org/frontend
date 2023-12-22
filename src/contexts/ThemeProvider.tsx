'use client'

import clsx from 'clsx'
import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useState
} from 'react'

const ThemeContext = createContext<boolean>(true)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ToggleThemeContext = createContext<() => void>(() => {})

interface ThemeProviderProps {
  children: ReactNode
  isDarkMode: boolean
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  isDarkMode
}) => {
  const [_isDarkMode, setIsDarkMode] = useState<boolean>(isDarkMode)

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={_isDarkMode}>
      <ToggleThemeContext.Provider value={toggleTheme}>
        <div
          id="root"
          className={clsx('relative min-h-screen', { dark: _isDarkMode })}
        >
          {children}
        </div>
      </ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => ({
  isDarkMode: useContext(ThemeContext)
})

export const useToggleTheme = () => ({
  toggleTheme: useContext(ToggleThemeContext)
})
