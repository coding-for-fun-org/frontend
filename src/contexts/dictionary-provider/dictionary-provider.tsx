'use client'

import { type FC, type ReactNode, createContext, useContext } from 'react'

import type { TDictionary } from '@/types/root/index'

import type { TTranslateParams } from './types'
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
  const translate = (key: string, params?: TTranslateParams) => {
    const targetDictionaryValue = findTargetDictionaryValue(key, dictionary)

    if (targetDictionaryValue === undefined) {
      return undefined
    }

    return params
      ? replaceDynamicText(params, targetDictionaryValue)
      : targetDictionaryValue
  }

  return {
    dictionary,
    translate
  }
}
