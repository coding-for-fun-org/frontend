import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

export type TTableItem = {
  key: string
}

export type TTableRow<T> = TTableItem &
  Omit<HTMLAttributes<HTMLTableRowElement>, keyof TTableItem> & {
    items: T[]
  }

export type TTableHeader = TTableItem &
  Omit<ThHTMLAttributes<HTMLTableCellElement>, keyof TTableItem>

export type TTableCell = TTableItem &
  Omit<TdHTMLAttributes<HTMLTableCellElement>, keyof TTableItem>
