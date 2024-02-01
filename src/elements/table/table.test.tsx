import { render, screen, within } from '@/utils/root/test/testing-library'

import {
  SKELETON_ROW_LENGTH,
  Table,
  TableBodyContent,
  TableSkeleton
} from './table'

const tableHeaders = [
  {
    key: 'header-0',
    className: 'header-0-class',
    items: [
      {
        key: 'header-0-item-0',
        className: 'header-0-item-0-class',
        children: 'header-0-item-0-text'
      },
      {
        key: 'header-0-item-1',
        className: 'header-0-item-1-class',
        children: 'header-0-item-1-text'
      },
      {
        key: 'header-0-item-2',
        className: 'header-0-item-2-class',
        children: 'header-0-item-2-text'
      }
    ]
  },
  {
    key: 'header-1',
    className: 'header-1-class',
    items: [
      {
        key: 'header-1-item-0',
        className: 'header-1-item-0-class',
        children: 'header-1-item-0-text'
      },
      {
        key: 'header-1-item-1',
        className: 'header-1-item-1-class',
        children: 'header-1-item-1-text'
      },
      {
        key: 'header-1-item-2',
        className: 'header-1-item-2-class',
        children: 'header-1-item-2-text'
      }
    ]
  }
]
const tableCells = [
  {
    key: 'cell-0',
    className: 'cell-0-class',
    items: [
      {
        key: 'cell-0-item-0',
        className: 'cell-0-item-0-class',
        children: 'cell-0-item-0-text'
      },
      {
        key: 'cell-0-item-1',
        className: 'cell-0-item-1-class',
        children: 'cell-0-item-1-text'
      },
      {
        key: 'cell-0-item-2',
        className: 'cell-0-item-2-class',
        children: 'cell-0-item-2-text'
      }
    ]
  },
  {
    key: 'cell-1',
    className: 'cell-1-class',
    items: [
      {
        key: 'cell-1-item-0',
        className: 'cell-1-item-0-class',
        children: 'cell-1-item-0-text'
      },
      {
        key: 'cell-1-item-1',
        className: 'cell-1-item-1-class',
        children: 'cell-1-item-1-text'
      },
      {
        key: 'cell-1-item-2',
        className: 'cell-1-item-2-class',
        children: 'cell-1-item-2-text'
      }
    ]
  },
  {
    key: 'cell-2',
    className: 'cell-2-class',
    items: [
      {
        key: 'cell-2-item-0',
        className: 'cell-2-item-0-class',
        children: 'cell-2-item-0-text'
      },
      {
        key: 'cell-2-item-1',
        className: 'cell-2-item-1-class',
        children: 'cell-2-item-1-text'
      },
      {
        key: 'cell-2-item-2',
        className: 'cell-2-item-2-class',
        children: 'cell-2-item-2-text'
      }
    ]
  }
]

const testSkeletonLoad = (header: (typeof tableHeaders)[0]) => {
  const rows = screen.getAllByRole('row')
  expect(rows).toHaveLength(SKELETON_ROW_LENGTH)
  rows.forEach((row) => {
    expect(row).toHaveClass(header.className)

    const cells = within(row).getAllByRole('cell')
    expect(cells).toHaveLength(3)

    cells.forEach((cell, index) => {
      expect(cell).toHaveClass(header.items[index]!.className)
      expect(cell.querySelector('.skeleton')).not.toBeNull()
    })
  })
}

describe('TableSkeleton', () => {
  it('should load SKELETON_ROW_LENGTH rows skeleton', () => {
    render(
      <table>
        <tbody>
          <TableSkeleton header={tableHeaders[0]} />
        </tbody>
      </table>
    )

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(SKELETON_ROW_LENGTH)
    rows.forEach((row) => {
      const cells = within(row).getAllByRole('cell')
      expect(cells).toHaveLength(3)

      cells.forEach((cell) => {
        expect(cell.querySelector('.skeleton')).not.toBeNull()
      })
    })
  })

  it('should have first header row class and each item class', () => {
    const firstHeader = tableHeaders[0]

    render(
      <table>
        <tbody>
          <TableSkeleton header={firstHeader} />
        </tbody>
      </table>
    )

    testSkeletonLoad(firstHeader!)
  })
})

describe('TableBodyContent', () => {
  it('should render skeleton if cells are undefined', () => {
    render(
      <table>
        <tbody>
          <TableBodyContent headers={tableHeaders} cells={undefined} />
        </tbody>
      </table>
    )

    testSkeletonLoad(tableHeaders[0]!)
  })

  it('should render info alert message', () => {
    render(
      <table>
        <tbody>
          <TableBodyContent headers={tableHeaders} cells={[]} />
        </tbody>
      </table>
    )

    expect(screen.getByTestId('info-circled-icon')).toBeInTheDocument()
    expect(screen.getByText('COMMON.ALERT_NO_DATA_TITLE')).toBeInTheDocument()
    expect(
      screen.getByText('COMMON.ALERT_NO_DATA_DESCRIPTION')
    ).toBeInTheDocument()
  })

  it('should tableCells data as expected if cells.length > 0', () => {
    render(
      <table>
        <tbody>
          <TableBodyContent headers={tableHeaders} cells={tableCells} />
        </tbody>
      </table>
    )

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3)

    expect(rows[0]).toHaveClass('cell-0-class')
    const row0cells = within(rows[0]!).getAllByRole('cell')
    expect(row0cells).toHaveLength(3)
    expect(row0cells[0]).toHaveTextContent('cell-0-item-0-text')
    expect(row0cells[0]).toHaveClass('cell-0-item-0-class')
    expect(row0cells[1]).toHaveTextContent('cell-0-item-1-text')
    expect(row0cells[1]).toHaveClass('cell-0-item-1-class')
    expect(row0cells[2]).toHaveTextContent('cell-0-item-2-text')
    expect(row0cells[2]).toHaveClass('cell-0-item-2-class')

    expect(rows[1]).toHaveClass('cell-1-class')
    const row1cells = within(rows[1]!).getAllByRole('cell')
    expect(row1cells).toHaveLength(3)
    expect(row1cells[0]).toHaveTextContent('cell-1-item-0-text')
    expect(row1cells[0]).toHaveClass('cell-1-item-0-class')
    expect(row1cells[1]).toHaveTextContent('cell-1-item-1-text')
    expect(row1cells[1]).toHaveClass('cell-1-item-1-class')
    expect(row1cells[2]).toHaveTextContent('cell-1-item-2-text')
    expect(row1cells[2]).toHaveClass('cell-1-item-2-class')

    expect(rows[2]).toHaveClass('cell-2-class')
    const row2cells = within(rows[2]!).getAllByRole('cell')
    expect(row2cells).toHaveLength(3)
    expect(row2cells[0]).toHaveTextContent('cell-2-item-0-text')
    expect(row2cells[0]).toHaveClass('cell-2-item-0-class')
    expect(row2cells[1]).toHaveTextContent('cell-2-item-1-text')
    expect(row2cells[1]).toHaveClass('cell-2-item-1-class')
    expect(row2cells[2]).toHaveTextContent('cell-2-item-2-text')
    expect(row2cells[2]).toHaveClass('cell-2-item-2-class')
  })
})

describe('Table', () => {
  it('should set className for table tag', () => {
    const TEST_CLASS = 'TEST-CLASS'

    render(
      <Table headers={tableHeaders} cells={tableCells} className={TEST_CLASS} />
    )

    expect(screen.getByRole('table')).toHaveClass(TEST_CLASS)
  })

  it('should render headers as expected', () => {
    render(<Table headers={tableHeaders} cells={tableCells} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(5)

    expect(rows[0]).toHaveClass('header-0-class')
    const row0headers = within(rows[0]!).getAllByRole('columnheader')
    expect(row0headers).toHaveLength(3)
    expect(row0headers[0]).toHaveTextContent('header-0-item-0-text')
    expect(row0headers[0]).toHaveClass('header-0-item-0-class')
    expect(row0headers[1]).toHaveTextContent('header-0-item-1-text')
    expect(row0headers[1]).toHaveClass('header-0-item-1-class')
    expect(row0headers[2]).toHaveTextContent('header-0-item-2-text')
    expect(row0headers[2]).toHaveClass('header-0-item-2-class')

    expect(rows[1]).toHaveClass('header-1-class')
    const row1headers = within(rows[1]!).getAllByRole('columnheader')
    expect(row1headers).toHaveLength(3)
    expect(row1headers[0]).toHaveTextContent('header-1-item-0-text')
    expect(row1headers[0]).toHaveClass('header-1-item-0-class')
    expect(row1headers[1]).toHaveTextContent('header-1-item-1-text')
    expect(row1headers[1]).toHaveClass('header-1-item-1-class')
    expect(row1headers[2]).toHaveTextContent('header-1-item-2-text')
    expect(row1headers[2]).toHaveClass('header-1-item-2-class')
  })

  it('should render cells as expected', () => {
    render(<Table headers={tableHeaders} cells={tableCells} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(5)

    expect(rows[2]).toHaveClass('cell-0-class')
    const row2cells = within(rows[2]!).getAllByRole('cell')
    expect(row2cells).toHaveLength(3)
    expect(row2cells[0]).toHaveTextContent('cell-0-item-0-text')
    expect(row2cells[0]).toHaveClass('cell-0-item-0-class')
    expect(row2cells[1]).toHaveTextContent('cell-0-item-1-text')
    expect(row2cells[1]).toHaveClass('cell-0-item-1-class')
    expect(row2cells[2]).toHaveTextContent('cell-0-item-2-text')
    expect(row2cells[2]).toHaveClass('cell-0-item-2-class')

    expect(rows[3]).toHaveClass('cell-1-class')
    const row3cells = within(rows[3]!).getAllByRole('cell')
    expect(row3cells).toHaveLength(3)
    expect(row3cells[0]).toHaveTextContent('cell-1-item-0-text')
    expect(row3cells[0]).toHaveClass('cell-1-item-0-class')
    expect(row3cells[1]).toHaveTextContent('cell-1-item-1-text')
    expect(row3cells[1]).toHaveClass('cell-1-item-1-class')
    expect(row3cells[2]).toHaveTextContent('cell-1-item-2-text')
    expect(row3cells[2]).toHaveClass('cell-1-item-2-class')

    expect(rows[4]).toHaveClass('cell-2-class')
    const row4cells = within(rows[4]!).getAllByRole('cell')
    expect(row4cells).toHaveLength(3)
    expect(row4cells[0]).toHaveTextContent('cell-2-item-0-text')
    expect(row4cells[0]).toHaveClass('cell-2-item-0-class')
    expect(row4cells[1]).toHaveTextContent('cell-2-item-1-text')
    expect(row4cells[1]).toHaveClass('cell-2-item-1-class')
    expect(row4cells[2]).toHaveTextContent('cell-2-item-2-text')
    expect(row4cells[2]).toHaveClass('cell-2-item-2-class')
  })
})
