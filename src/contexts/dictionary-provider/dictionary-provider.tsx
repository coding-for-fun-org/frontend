'use client'

import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { getDictionary } from '@/dictionaries/root/index'

import { getLanguage } from '@/utils/root/language'

import { EIsoLanguageCode } from '@/types/root/index'

import type { TDictionary, TTranslateKeys, TTranslateParams } from './types'
import { translate } from './utils'

// @ts-expect-error - no need to initialize real dictionary
const DictionaryContext = createContext<TDictionary>({})

interface DictionaryProviderProps {
  children: ReactNode
}

export const DictionaryProvider: FC<DictionaryProviderProps> = ({
  children
}) => {
  const [lang, setLang] = useState(getLanguage()) // cookie
  const [dictionary, setDictionary] = useState({})

  const handleLanguage = async () => {
    const dic = await getDictionary(lang)
    setDictionary(dic)
  }

  useEffect(() => {
    switch (lang) {
      case EIsoLanguageCode.ENGLISH:
        document.documentElement.lang = EIsoLanguageCode.ENGLISH
        break
      case EIsoLanguageCode.KOREAN:
        document.documentElement.lang = EIsoLanguageCode.KOREAN
        break
    }
    handleLanguage()
  }, [lang])

  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  )
}

export const useDictionary = () => {
  const xxx = useContext(DictionaryContext)

  return {
    translate: <K extends TTranslateKeys, P extends TTranslateParams<K>>(
      key: K,
      params?: P
    ) => translate(xxx, key, params)
  }
}
