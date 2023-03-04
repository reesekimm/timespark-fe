import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { render, screen, userEvent } from '../../utils/rtl-utils'
import { TaskList, TaskListProps } from './task-list'
import { data } from './data'

function renderTaskList({
  onDrop,
  onDelete,
  onStart,
  onPause,
  onComplete
}: Pick<
  TaskListProps,
  'onDrop' | 'onDelete' | 'onStart' | 'onPause' | 'onComplete'
>) {
  render(
    <DndProvider backend={HTML5Backend}>
      <TaskList
        data={data}
        onDrop={onDrop}
        onDelete={onDelete}
        onStart={onStart}
        onPause={onPause}
        onComplete={onComplete}
        activeTaskId=''
      />
    </DndProvider>
  )
}

describe('TaskList', () => {
  const onDrop = jest.fn()
  const onDelete = jest.fn()
  const onStart = jest.fn()
  const onPause = jest.fn()
  const onComplete = jest.fn()

  beforeEach(() => {
    onDrop.mockClear()
    onDelete.mockClear()
    onStart.mockClear()
    onPause.mockClear()
    onComplete.mockClear()
  })

  it('renders appropriately', () => {
    renderTaskList({ onDrop, onDelete, onStart, onPause, onComplete })

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

    expect(tableBody?.children.length).toBe(7)
  })

  it('can delete task on click delete button', async () => {
    renderTaskList({ onDrop, onDelete, onStart, onPause, onComplete })

    const firstTaskDeleteButton = screen.getAllByTitle(/delete/i)[0]

    await userEvent.click(firstTaskDeleteButton)

    expect(onDelete).toBeCalled()
  })

  it('can start task', async () => {
    renderTaskList({ onDrop, onDelete, onStart, onPause, onComplete })

    const firstTaskStartButton = screen.getAllByTitle(/start/i)[0]

    await userEvent.click(firstTaskStartButton)

    expect(onStart).toBeCalled()
  })

  it('can pause task', async () => {
    renderTaskList({ onDrop, onDelete, onStart, onPause, onComplete })

    const firstTaskStartButton = screen.getAllByTitle(/start/i)[0]
    await userEvent.click(firstTaskStartButton)

    const pauseButtons = await screen.findAllByTitle(/pause/i)
    await userEvent.click(pauseButtons[0])

    expect(onPause).toBeCalled()
  })

  it('can complete task', async () => {
    renderTaskList({ onDrop, onDelete, onStart, onPause, onComplete })

    const firstTaskStartButton = screen.getAllByTitle(/start/i)[0]

    await userEvent.click(firstTaskStartButton)

    const pauseButtons = await screen.findAllByTitle(/pause/i)
    await userEvent.click(pauseButtons[0])

    const completeButtons = await screen.findAllByTitle(/complete/i)
    await userEvent.click(completeButtons[0])

    expect(onComplete).toBeCalled()
  })
})
