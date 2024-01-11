import type { EIsoLanguageCode } from '@/types/root/index'

const dictionaries = {
  en: () => import('./en').then((module) => module.dictionary)
}

export const getDictionary = async (locale: EIsoLanguageCode) =>
  dictionaries[locale]()
