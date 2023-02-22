import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { render, screen } from '../../utils/rtl-utils'
import { Table } from './table'
import { data as tableData } from './data'

function renderTable(data = tableData) {
  render(
    <DndProvider backend={HTML5Backend}>
      <Table data={data} />
    </DndProvider>
  )
}

describe('Table', () => {
  it('renders table head and table body appropriately', () => {
    renderTable()

    const task = screen.getByRole('columnheader', { name: /task/i })
    const estimatedDuration = screen.getByRole('columnheader', {
      name: /estimated dur\. \(min\)/i
    })
    const actualDuration = screen.getByRole('columnheader', {
      name: /actual dur\. \(min\)/i
    })

    expect(task).toBeInTheDocument()
    expect(estimatedDuration).toBeInTheDocument()
    expect(actualDuration).toBeInTheDocument()

    const tableBody = screen.getByRole('table').querySelector('tbody')

    expect(tableBody?.children.length).toBe(5)
  })
})
