import type { EIsoLanguageCode } from '@/types/root/index'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default)
}

export const getDictionary = async (locale: EIsoLanguageCode) =>
  dictionaries[locale]()
