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

    const category = screen.getByRole('columnheader', { name: /category/i })
    const title = screen.getByRole('columnheader', { name: /title/i })
    const estimatedDuration = screen.getByRole('columnheader', {
      name: /estimated dur\. \(min\)/i
    })
    const actualDuration = screen.getByRole('columnheader', {
      name: /actual dur\. \(min\)/i
    })

    expect(category).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(estimatedDuration).toBeInTheDocument()
    expect(actualDuration).toBeInTheDocument()

    const tableBody = screen.getByRole('table').querySelector('tbody')

    expect(tableBody?.children.length).toBe(5)
  })
})
