import type { TDictionary, TTranslateKeys } from './types'

export type TGeneralizedDictionary = {
  [key: string]: string | TGeneralizedDictionary
}

export const findTargetDictionaryValue = (
  key: TTranslateKeys,
  dictionary: TDictionary
): string | undefined => {
  const target = key
    .split('.')
    .reduce<TGeneralizedDictionary | string | undefined>(
      (accu, paratialKey) => {
        if (typeof accu === 'string') {
          return undefined
        }

        const target = accu?.[paratialKey]

        if (target !== undefined) {
          return target
        }

        return undefined
      },
      dictionary
    )

  if (typeof target !== 'string') {
    return undefined
  }

  return target
}

export const replaceDynamicText = (
  params: Record<string, unknown>,
  text: string
): string => {
  return Object.entries(params).reduce((accu, [paramKey, paramValue]) => {
    const placeholder = `{{${paramKey}}}`

    return accu.replace(new RegExp(placeholder, 'g'), String(paramValue))
  }, text)
}
