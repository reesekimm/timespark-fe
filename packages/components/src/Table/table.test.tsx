import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { render, screen, userEvent } from '../../utils/rtl-utils'
import { Table, TableProps } from './table'
import { data as tableData } from './data'

function renderTable({
  onDrop,
  onDelete
}: Pick<TableProps, 'onDrop' | 'onDelete'>) {
  render(
    <DndProvider backend={HTML5Backend}>
      <Table data={tableData} onDrop={onDrop} onDelete={onDelete} />
    </DndProvider>
  )
}

describe('Table', () => {
  const onDrop = jest.fn()
  const onDelete = jest.fn()

  beforeEach(() => {
    onDrop.mockClear()
    onDelete.mockClear()
  })

  it('renders table head and table body appropriately', () => {
    renderTable({ onDrop, onDelete })

    const task = screen.getByRole('columnheader', { name: /task/i })
    const estimatedDuration = screen.getByRole('columnheader', {
      name: /est\./i
    })
    const actualDuration = screen.getByRole('columnheader', {
      name: /act\./i
    })

    expect(task).toBeInTheDocument()
    expect(estimatedDuration).toBeInTheDocument()
    expect(actualDuration).toBeInTheDocument()

    const tableBody = screen.getByRole('table').querySelector('tbody')

    expect(tableBody?.children.length).toBe(5)
  })

  it('can delete row on click delete button', async () => {
    renderTable({ onDrop, onDelete })

    const deleteButtonOfFirstTask = screen.getAllByTitle('delete')[0]

    await userEvent.click(deleteButtonOfFirstTask)

    expect(onDelete).toBeCalled()
  })
})
