import { render, screen, userEvent, waitFor, within } from '../utils/rtl-utils'
import { server } from '../mock/server/test-server'
import { rest } from 'msw'
import { ERROR_MESSAGES } from '../utils/constants'
import * as tasksDB from '../mock/tasks'
import Home from '../screens/Home'

function renderHomeScreen() {
  return render(<Home />)
}

async function fillOutTheForm() {
  const categorySelect = screen.getByRole('combobox', {
    name: /category/i
  })
  const taskInput = screen.getByRole('textbox')
  const estimatedDurSelect = screen.getByRole('combobox', {
    name: /estimated dur\. \(min\)/i
  })
  const addButton = screen.getByRole('button', { name: /add/i })

  expect(addButton).toBeDisabled()

  await userEvent.selectOptions(
    categorySelect,
    screen.getByRole('option', { name: /none/i })
  )

  expect(
    (screen.getByRole('option', { name: /none/i }) as HTMLOptionElement)
      .selected
  ).toBe(true)

  await userEvent.type(taskInput, 'test')

  expect(screen.getByRole('button', { name: /add/i })).toBeEnabled()

  await userEvent.selectOptions(
    estimatedDurSelect,
    screen.getByRole('option', {
      name: '30'
    })
  )

  expect(
    (screen.getByRole('option', { name: '30' }) as HTMLOptionElement).selected
  ).toBe(true)

  await userEvent.click(addButton)
}

describe('[CREATE TASK]', () => {
  it('can create a task and renders it in the table', async () => {
    renderHomeScreen()

    await fillOutTheForm()

    await waitFor(() => {
      const createdRow = screen.getAllByRole('row')[1]
      expect(within(createdRow).getByText(/none/i)).toBeInTheDocument()
      expect(within(createdRow).getAllByText(/test/i)).toHaveLength(3) // title, start button, delete button
      expect(within(createdRow).getByText('30:00')).toBeInTheDocument()
      expect(within(createdRow).getByText('00:00')).toBeInTheDocument()
    })
  })

  it('shows an error message when create task fails', async () => {
    server.use(
      rest.post('/task', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    renderHomeScreen()

    await fillOutTheForm()

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        ERROR_MESSAGES.SERVER_DOWN
      )
    })
  })
})

describe('[RENDER TASKS]', () => {
  describe('if there is any task', () => {
    beforeEach(() => {
      tasksDB.reset()
    })

    it('renders all tasks in the table', async () => {
      renderHomeScreen()

      await waitFor(() => {
        const row = screen.getAllByRole('row')[1]
        expect(within(row).getByText(/none/i)).toBeInTheDocument()
        expect(within(row).getAllByText(/task of today/i)).toHaveLength(3) // title, start button, delete button
        expect(within(row).getByText('20:00')).toBeInTheDocument()
        expect(within(row).getByText('00:00')).toBeInTheDocument()
      })
    })

    it('shows an error message when tasks fail to load', async () => {
      server.use(
        rest.get('/tasks', (req, res, ctx) => {
          return res(ctx.status(500))
        })
      )

      renderHomeScreen()

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          ERROR_MESSAGES.SERVER_DOWN
        )
      })
    })
  })

  describe('if there are no tasks', () => {
    it('renders empty section', () => {
      renderHomeScreen()

      expect(screen.getByText(/add your first task :\)/i)).toBeInTheDocument()
    })
  })
})

describe('[DELETE TASK]', () => {
  beforeEach(() => {
    tasksDB.reset()
  })

  it('can delete task from the table', async () => {
    renderHomeScreen()

    const deleteButtons = await screen.findAllByTitle(/delete/i, {
      exact: false
    })

    await userEvent.click(deleteButtons[0])

    expect(screen.queryByText(/task 1/i)).not.toBeInTheDocument()
  })

  it('shows an error message when delete task fails', async () => {
    server.use(
      rest.delete('/task/:id', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    renderHomeScreen()

    const deleteButtons = await screen.findAllByTitle(/delete/i, {
      exact: false
    })

    await userEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        ERROR_MESSAGES.SERVER_DOWN
      )
    })
  })
})

describe('[START TASK]', () => {
  describe('on click start button', () => {
    beforeEach(() => {
      tasksDB.create({
        categoryName: 'Category',
        title: 'title1',
        estimatedDuration: 30
      })
      tasksDB.create({
        categoryName: 'Category',
        title: 'title2',
        estimatedDuration: 30
      })
    })

    it('disable other tasks', async () => {
      renderHomeScreen()

      const startButtons = await screen.findAllByRole('button', {
        name: /start title/i,
        exact: false
      })

      expect(startButtons).toHaveLength(2)
      expect(startButtons[0]).toBeEnabled()
      expect(startButtons[1]).toBeEnabled()

      await userEvent.click(startButtons[0])

      await waitFor(() => {
        expect(startButtons[1]).toBeDisabled()
      })
    })

    it('replaces start button with pause button', async () => {
      renderHomeScreen()

      const firstTaskStartButton = await screen.findByTitle(/start title1/i)

      await userEvent.click(firstTaskStartButton)

      await waitFor(() => {
        expect(screen.queryByTitle(/start title1/i)).not.toBeInTheDocument()
        expect(screen.getByTitle(/pause title1/i)).toBeInTheDocument()
      })
    })

    it('udpates actual duration of the task and total actual duration', async () => {
      renderHomeScreen()

      const table = await screen.findByRole('table')
      const firstTask = table.querySelector('tbody > tr:first-child')
      const firstTaskStartButton = within(
        firstTask as HTMLTableRowElement
      ).getByTitle(/start title1/i)

      await userEvent.click(firstTaskStartButton)

      setTimeout(() => {
        const firstTaskActualDur = within(
          firstTask as HTMLTableRowElement
        ).getAllByRole('time')[1]

        const tFoot = screen.getByRole('table').querySelector('tfoot')

        const totalActualDur = within(
          tFoot as HTMLTableSectionElement
        ).getAllByRole('time')[1]

        expect(firstTaskActualDur).toHaveValue('00:03')
        expect(totalActualDur).toHaveValue('00:03')
      }, 3000)
    })

    it('updates progress bar to display remaining time', async () => {
      renderHomeScreen()

      const table = await screen.findByRole('table')
      const firstTask = table.querySelector('tbody > tr:first-child')
      const firstTaskStartButton = within(
        firstTask as HTMLTableRowElement
      ).getByTitle(/start title1/i)

      const initialProgressBarWidth = within(
        firstTask as HTMLTableRowElement
      ).getByTestId('bar').clientWidth

      await userEvent.click(firstTaskStartButton)

      setTimeout(() => {
        const currentProgressBarWidth = within(
          firstTask as HTMLTableRowElement
        ).getByTestId('bar').clientWidth

        expect(currentProgressBarWidth).toBeLessThan(initialProgressBarWidth)
      }, 3000)
    })
  })
})

describe('[PAUSE TASK]', () => {
  describe('on click pause button', () => {
    beforeEach(() => {
      tasksDB.create({
        categoryName: 'Category',
        title: 'title1',
        estimatedDuration: 30
      })
      tasksDB.create({
        categoryName: 'Category',
        title: 'title2',
        estimatedDuration: 30
      })
    })

    it('enables all tasks', async () => {
      renderHomeScreen()

      const startButtons = await screen.findAllByTitle(/start title/i, {
        exact: false
      })

      expect(startButtons[0]).toBeEnabled()
      expect(startButtons[1]).toBeEnabled()

      await userEvent.click(startButtons[0])

      waitFor(() => {
        expect(startButtons[1]).toBeDisabled()
      })

      const pauseButton = await screen.findByTitle(/pause title1/i)

      await userEvent.click(pauseButton)

      await waitFor(() => {
        expect(startButtons[0]).toBeEnabled()
        expect(startButtons[1]).toBeEnabled()
      })
    })

    it('replaces pause button with start/complete buttons', async () => {
      renderHomeScreen()

      const startButton = await screen.findByTitle(/start title1/i)

      await userEvent.click(startButton)

      const pauseButton = await screen.findByTitle(/pause title1/i)

      await userEvent.click(pauseButton)

      await waitFor(() => {
        expect(screen.queryByTitle(/pause title1/i)).not.toBeInTheDocument()
        expect(screen.getByTitle(/resume title1/i)).toBeInTheDocument()
        expect(screen.getByTitle(/complete title1/i)).toBeInTheDocument()
      })
    })

    it('stops udpating actual duration of the task and total actual duration', async () => {
      renderHomeScreen()

      const table = await screen.findByRole('table')
      const firstTask = table.querySelector(
        'tbody > tr:first-child'
      ) as HTMLTableRowElement
      const firstTaskStartButton = within(firstTask).getByTitle(/start title1/i)

      await userEvent.click(firstTaskStartButton)

      const firstTaskPauseButton = await within(firstTask).findByTitle(
        /pause title1/i
      )
      await userEvent.click(firstTaskPauseButton)

      const initialActualDur = within(firstTask).getByTestId('actual-duration')

      const tFoot = screen
        .getByRole('table')
        .querySelector('tfoot') as HTMLTableSectionElement
      const initialTotalActualDur = within(tFoot).getByTestId(
        'total-actual-duration'
      )

      setTimeout(() => {
        const currentActualDur =
          within(firstTask).getByTestId('actual-duration')
        const currentTotalActualDur = within(tFoot).getByTestId(
          'total-actual-duration'
        )

        expect(initialActualDur).toEqual(currentActualDur)
        expect(initialTotalActualDur).toEqual(currentTotalActualDur)
      }, 3000)
    })

    // it('stop updating progress bar to display remaining time', async () => {})
  })
})
