'use client'

import { type FC, type ReactNode, createContext, useContext } from 'react'

import type { TDictionary } from '@/types/root/index'

// @ts-expect-error - no need to initialize real dictionary
const DictionaryContext = createContext<TDictionary>({})

interface DictionaryProviderProps {
  children: ReactNode
  dictionary: TDictionary
}

interface ITranslateParams {
  repoName: string
}

export const DictionaryProvider: FC<DictionaryProviderProps> = ({
  children,
  dictionary
}) => {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  )
}

export const useDictionary = () => {
  const dictionary = useContext(DictionaryContext)
  const translate = (key: string, params: ITranslateParams) => {
    const keys = key.split('.')
    let result =
      keys.reduce((acc, k) => {
        if (!acc) {
          return ''
        }
        return acc[k]
      }, dictionary) || ''

    if (params) {
      result = Object.keys(params).reduce((acc, paramKey) => {
        const placeholder = `{${paramKey}}`
        return acc.replace(new RegExp(placeholder, 'g'), params[paramKey])
      }, result)
    }
    return result
  }

  return {
    dictionary,
    translate
  }
}
