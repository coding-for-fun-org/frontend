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
  const translate = (key: string, params: ITranslateParams) => {
    const keys = key.split('.')
    let value = dictionary

    for (const k of keys) {
      value = value[k]
      if (!value) {
        return ''
      }
    }

    if (params) {
      Object.keys(params).forEach((paramKey) => {
        const placeholder = `{${paramKey}}`
        value = value.replace(new RegExp(placeholder, 'g'), params[paramKey])
      })
    }

    return value
  }
  return (
    <DictionaryContext.Provider value={{ ...dictionary, translate }}>
      {children}
    </DictionaryContext.Provider>
  )
}

export const useDictionary = () => {
  const dictionary = useContext(DictionaryContext)

  return {
    dictionary,
    translate: dictionary.translate
  }
}
