const dictionaries = {
  en: () => import('./en.json').then((module) => module.default)
}

export const getDictionary = async (locale: 'en') => dictionaries[locale]()
