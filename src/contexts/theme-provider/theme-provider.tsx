'use client'

import {
  type FC,
  type ReactNode,
  createContext,
  memo,
  useContext,
  useEffect,
  useState
} from 'react'

import { isServer } from '@/utils/root/index'

import { ELocalStorageKey, ETheme } from '@/types/root/index'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ToggleThemeContext = createContext<() => void>(() => {})

const ThemeScript = memo(
  () => (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(){try{var b=document.body,c=b.classList;c.remove('dark');var e=localStorage.getItem('__cff--theme')||'dark';if(e==='dark'){c.add(e);b.style.colorScheme=e}else{b.style.colorScheme='light'}}catch(e){}}()`
      }}
    />
  ),
  () => true
)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [_isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return !isServer()
      ? ((localStorage.getItem(ELocalStorageKey.THEME) as ETheme | null) ??
          ETheme.DARK) === ETheme.DARK
      : false
  })

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem(
        ELocalStorageKey.THEME,
        !prev ? ETheme.DARK : ETheme.LIGHT
      )

      return !prev
    })
  }

  useEffect(() => {
    const documentBody = document.body

    if (_isDarkMode) {
      documentBody.classList.add('dark')
      documentBody.style.colorScheme = 'dark'
    } else {
      documentBody.classList.remove('dark')
      documentBody.style.colorScheme = 'light'
    }
  }, [_isDarkMode])

  return (
    <ToggleThemeContext.Provider value={toggleTheme}>
      <ThemeScript />
      {children}
    </ToggleThemeContext.Provider>
  )
}

export const useToggleTheme = () => ({
  toggleTheme: useContext(ToggleThemeContext)
})
