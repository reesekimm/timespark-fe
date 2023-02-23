import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { render, screen, userEvent } from '../../utils/rtl-utils'
import { Table, TableProps } from './table'
import { data as tableData } from './data'

function renderTable({
  onDrop,
  onDelete,
  onStart
}: Pick<TableProps, 'onDrop' | 'onDelete' | 'onStart'>) {
  render(
    <DndProvider backend={HTML5Backend}>
      <Table
        data={tableData}
        onDrop={onDrop}
        onDelete={onDelete}
        onStart={onStart}
      />
    </DndProvider>
  )
}

describe('Table', () => {
  const onDrop = jest.fn()
  const onDelete = jest.fn()
  const onStart = jest.fn()

  beforeEach(() => {
    onDrop.mockClear()
    onDelete.mockClear()
    onStart.mockClear()
  })

  it('renders table head and table body appropriately', () => {
    renderTable({ onDrop, onDelete, onStart })

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
    renderTable({ onDrop, onDelete, onStart })

    const deleteButtonOfFirstTask = screen.getAllByTitle('delete')[0]

    await userEvent.click(deleteButtonOfFirstTask)

    expect(onDelete).toBeCalled()
  })

  it('can start task', async () => {
    renderTable({ onDrop, onDelete, onStart })

    const startButtonOfFirstTask = screen.getAllByTitle('start')[0]

    await userEvent.click(startButtonOfFirstTask)

    expect(onStart).toBeCalled()
  })
})
