import type { TTableHeader, TTableRow } from './types'

/**
 * @description - if headers is empty or items is empty, return 1
 *
 * @returns {number} - always > 0
 */
export const getHighestColumnsLength = (
  headers: TTableRow<TTableHeader>[]
): number => {
  return (
    (headers.length > 0
      ? Math.max(...headers.map(({ items }) => items.length))
      : 0) || 1
  )
}
