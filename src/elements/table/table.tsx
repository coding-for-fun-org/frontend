import clsx from 'clsx'
import {
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  forwardRef
} from 'react'

import { Alert } from '@/elements/root/alert/alert'
import { Skeleton } from '@/elements/root/skeleton/skeleton'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import type { TTableCell, TTableHeader, TTableRow } from './types'
import { getHighestColumnsLength } from './utils'

const TableRoot = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={clsx('w-full caption-bottom text-sm', className)}
    {...props}
  />
))
TableRoot.displayName = 'Table'

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={clsx('[&_tr]:border-b', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={clsx('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

/* const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={clsx(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter' */

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={clsx(
      'border-b transition-colors data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={clsx(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={clsx(
      'p-4 align-middle [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

/* const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={clsx('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption' */

type TCustomProps = {
  headers: TTableRow<TTableHeader>[]
  cells: TTableRow<TTableCell>[] | undefined
}

type TTableProps = Omit<
  TableHTMLAttributes<HTMLTableElement>,
  keyof TCustomProps
> &
  TCustomProps

// export it for testing purposes
export const SKELETON_ROW_LENGTH = 5

// export it for testing purposes
export const TableSkeleton = ({
  header
}: {
  header: TTableRow<TTableHeader> | undefined
}) => {
  if (!header) {
    return null
  }

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key: _,
    className: rowClassName,
    items,
    ...rowProps
  } = header

  return Array.from({ length: SKELETON_ROW_LENGTH }, (_, rowIndex: number) => (
    <TableRow
      key={`skeleton-row-${rowIndex}`}
      className={rowClassName}
      {...rowProps}
    >
      {items.map(
        ({ key: _, className: itemClassName, ...cellProps }, columnIndex) => (
          <TableCell
            key={`skeleton-row-${rowIndex}-cell-${columnIndex}`}
            className={itemClassName}
            {...cellProps}
          >
            <Skeleton variant="rect" className="w-full" />
          </TableCell>
        )
      )}
    </TableRow>
  ))
}

// export it for testing purposes
export const TableBodyContent = ({ headers, cells }: TCustomProps) => {
  const { translate } = useDictionary()

  if (cells === undefined) {
    return <TableSkeleton header={headers[0]} />
  }

  if (cells.length === 0) {
    const highestColumnLength = getHighestColumnsLength(headers)

    return (
      <TableRow>
        <TableCell colSpan={highestColumnLength}>
          <Alert
            variant="info"
            title={translate('COMMON.ALERT_NO_DATA_TITLE')}
            description={translate('COMMON.ALERT_NO_DATA_DESCRIPTION')}
          />
        </TableCell>
      </TableRow>
    )
  }

  return cells.map(
    ({ key: rowKey, className: rowClassName, items, ...rowProps }) => (
      <TableRow key={rowKey} className={rowClassName} {...rowProps}>
        {items.map(
          ({
            key: itemKey,
            className: itemClassName,
            children,
            ...cellProps
          }) => (
            <TableCell key={itemKey} className={itemClassName} {...cellProps}>
              {children}
            </TableCell>
          )
        )}
      </TableRow>
    )
  )
}

export const Table = ({ headers, cells, ...props }: TTableProps) => {
  return (
    <TableRoot {...props}>
      <TableHeader>
        {headers.map(
          ({ key: rowKey, className: rowClassName, items, ...rowProps }) => (
            <TableRow
              key={rowKey}
              className={clsx('bg-background', rowClassName)}
              {...rowProps}
            >
              {items.map(
                ({
                  key: itemKey,
                  className: itemClassName,
                  children,
                  ...cellProps
                }) => (
                  <TableHead
                    key={itemKey}
                    className={itemClassName}
                    {...cellProps}
                  >
                    {children}
                  </TableHead>
                )
              )}
            </TableRow>
          )
        )}
      </TableHeader>
      <TableBody>
        <TableBodyContent headers={headers} cells={cells} />
      </TableBody>
    </TableRoot>
  )
}
