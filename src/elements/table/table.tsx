import clsx from 'clsx'
import {
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  forwardRef
} from 'react'

import { Skeleton } from '@/elements/root/skeleton/skeleton'

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

type TTableItem = {
  key: string
}

type TTableRow<T> = TTableItem &
  Omit<HTMLAttributes<HTMLTableRowElement>, keyof TTableItem> & {
    items: T[]
  }

type TTableHeader = TTableItem &
  Omit<ThHTMLAttributes<HTMLTableCellElement>, keyof TTableItem>

type TTableCell = TTableItem &
  Omit<TdHTMLAttributes<HTMLTableCellElement>, keyof TTableItem>

type TCustomProps = {
  headers?: TTableRow<TTableHeader>[]
  cells?: TTableRow<TTableCell>[]
}

type TTableProps = Omit<
  TableHTMLAttributes<HTMLTableElement>,
  keyof TCustomProps
> &
  TCustomProps

export const Table = ({ headers, cells, ...props }: TTableProps) => {
  return (
    <TableRoot {...props}>
      <TableHeader>
        {!!headers &&
          headers.map(
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
        {!!cells ? (
          cells.map(
            ({ key: rowKey, className: rowClassName, items, ...rowProps }) => (
              <TableRow key={rowKey} className={rowClassName} {...rowProps}>
                {items.map(
                  ({
                    key: itemKey,
                    className: itemClassName,
                    children,
                    ...cellProps
                  }) => (
                    <TableCell
                      key={itemKey}
                      className={itemClassName}
                      {...cellProps}
                    >
                      {children}
                    </TableCell>
                  )
                )}
              </TableRow>
            )
          )
        ) : (
          <>
            <TableRow>
              <TableCell>
                <Skeleton variant="rect" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton variant="rect" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Skeleton variant="rect" />
              </TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </TableRoot>
  )
}
