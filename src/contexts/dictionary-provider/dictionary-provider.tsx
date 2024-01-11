'use client'

import { type FC, type ReactNode, createContext, useContext } from 'react'

import type { TDictionary, TTranslateKeys, TTranslateParams } from './types'
import { findTargetDictionaryValue, replaceDynamicText } from './utils'

// @ts-expect-error - no need to initialize real dictionary
const DictionaryContext = createContext<TDictionary>({})

interface DictionaryProviderProps {
  children: ReactNode
  dictionary: TDictionary
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
  const translate = <K extends TTranslateKeys, P extends TTranslateParams<K>>(
    key: K,
    params?: P
  ) => {
    const targetDictionaryValue = findTargetDictionaryValue(key, dictionary)

    if (targetDictionaryValue === undefined) {
      throw new Error(
        `Cannot find dictionary value for key: ${key}. You must've ignored typescript error.`
      )
    }

    return params
      ? replaceDynamicText(params, targetDictionaryValue)
      : targetDictionaryValue
  }

  return { translate }
}
