'use client'

import { type FC, type ReactNode, createContext, useContext } from 'react'

import type { TDictionary, TTranslateKeys, TTranslateParams } from './types'
import { translate } from './utils'

// @ts-expect-error - no need to initialize real dictionary
const DictionaryContext = createContext<TDictionary>({})

interface DictionaryProviderProps {
  dictionary: TDictionary
  children: ReactNode
}

export const DictionaryProvider: FC<DictionaryProviderProps> = ({
  dictionary,
  children
}) => {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  )
}

export const useDictionary = () => {
  const dictionary = useContext(DictionaryContext)

  return {
    translate: <K extends TTranslateKeys, P extends TTranslateParams<K>>(
      key: K,
      params?: P
    ) => translate(dictionary, key, params)
  }
}
