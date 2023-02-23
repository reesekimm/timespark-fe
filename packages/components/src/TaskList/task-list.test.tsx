import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { render, screen, userEvent } from '../../utils/rtl-utils'
import { TaskList, TaskListProps } from './task-list'
import { data } from './data'

function renderTaskList({
  onDrop,
  onDelete,
  onStart
}: Pick<TaskListProps, 'onDrop' | 'onDelete' | 'onStart'>) {
  render(
    <DndProvider backend={HTML5Backend}>
      <TaskList
        data={data}
        onDrop={onDrop}
        onDelete={onDelete}
        onStart={onStart}
      />
    </DndProvider>
  )
}

describe('TaskList', () => {
  const onDrop = jest.fn()
  const onDelete = jest.fn()
  const onStart = jest.fn()

  beforeEach(() => {
    onDrop.mockClear()
    onDelete.mockClear()
    onStart.mockClear()
  })

  it('renders appropriately', () => {
    renderTaskList({ onDrop, onDelete, onStart })

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

  it('can delete task on click delete button', async () => {
    renderTaskList({ onDrop, onDelete, onStart })

    const deleteButtonOfFirstTask = screen.getAllByTitle('delete')[0]

    await userEvent.click(deleteButtonOfFirstTask)

    expect(onDelete).toBeCalled()
  })

  it('can start task', async () => {
    renderTaskList({ onDrop, onDelete, onStart })

    const startButtonOfFirstTask = screen.getAllByTitle('start')[0]

    await userEvent.click(startButtonOfFirstTask)

    expect(onStart).toBeCalled()
  })
})
