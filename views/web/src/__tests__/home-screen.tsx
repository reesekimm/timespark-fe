import { render, screen, user, waitFor, within } from '../utils/rtl-utils'
import { server } from '../mock/server/test-server'
import { rest } from 'msw'
import { ERROR_MESSAGES } from '../utils/constants'
import Home from '../screens/Home'
import { taskClient } from '@timespark/infrastructure'

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

  await user.selectOptions(
    categorySelect,
    screen.getByRole('option', { name: /none/i })
  )

  expect(
    (screen.getByRole('option', { name: /none/i }) as HTMLOptionElement)
      .selected
  ).toBe(true)

  await user.type(taskInput, 'test')

  expect(screen.getByRole('button', { name: /add/i })).toBeEnabled()

  await user.selectOptions(
    estimatedDurSelect,
    screen.getByRole('option', {
      name: '30'
    })
  )

  expect(
    (screen.getByRole('option', { name: '30' }) as HTMLOptionElement).selected
  ).toBe(true)

  await user.click(addButton)
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
      taskClient.resetTasks()
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
    taskClient.resetTasks()
  })

  it('can delete task from the table', async () => {
    renderHomeScreen()

    const deleteButton = await screen.findByRole('button', {
      name: /delete task of today/i
    })

    await user.click(deleteButton)

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /delete task of today/i })
      ).not.toBeInTheDocument()
    })
  })

  it('shows an error message when delete task fails', async () => {
    server.use(
      rest.delete('/task/:id', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    renderHomeScreen()

    const deleteButton = await screen.findByRole('button', {
      name: /delete task of today/i
    })

    await user.click(deleteButton)

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
      taskClient.createTask({
        categoryId: '',
        title: 'title1',
        estimatedDuration: 30
      })
      taskClient.createTask({
        categoryId: '',
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

      await user.click(startButtons[0])

      await waitFor(() => {
        expect(startButtons[1]).toBeDisabled()
      })
    })

    it('replaces start button with pause button', async () => {
      renderHomeScreen()

      const firstTaskStartButton = await screen.findByRole('button', {
        name: /start title1/i
      })

      await user.click(firstTaskStartButton)

      await waitFor(() => {
        expect(
          screen.queryByRole('button', { name: /start title1/i })
        ).not.toBeInTheDocument()
        expect(
          screen.getByRole('button', { name: /pause title1/i })
        ).toBeInTheDocument()
      })
    })

    it('udpates actual duration of the task and total actual duration', async () => {
      renderHomeScreen()

      const firstTaskStartButton = await screen.findByRole('button', {
        name: /start title1/i
      })

      await user.click(firstTaskStartButton)

      const firstTaskActualDur = screen.getAllByTestId('actual-duration')[0]
      const totalActualDur = screen.getByTestId('total-actual-duration')

      setTimeout(() => {
        expect(firstTaskActualDur).toHaveValue('00:03')
        expect(totalActualDur).toHaveValue('00:03')
      }, 3000)
    })

    it('updates progress bar to display remaining time', async () => {
      renderHomeScreen()

      const firstTaskStartButton = await screen.findByRole('button', {
        name: /start title1/i
      })

      await user.click(firstTaskStartButton)

      const initialProgressBarWidth =
        screen.getAllByTestId('bar')[0].clientWidth

      setTimeout(() => {
        const currentProgressBarWidth =
          screen.getAllByTestId('bar')[0].clientWidth
        expect(currentProgressBarWidth).toBeLessThan(initialProgressBarWidth)
      }, 3000)
    })
  })
})

describe('[PAUSE TASK]', () => {
  describe('on click pause button', () => {
    beforeEach(() => {
      taskClient.createTask({
        categoryId: '',
        title: 'title1',
        estimatedDuration: 30
      })
      taskClient.createTask({
        categoryId: '',
        title: 'title2',
        estimatedDuration: 30
      })
    })

    it('enables all tasks', async () => {
      renderHomeScreen()

      const firstTaskStartButton = await screen.findByRole('button', {
        name: /start title1/i
      })
      await user.click(firstTaskStartButton)

      const pauseButton = await screen.findByRole('button', {
        name: /pause title1/i
      })
      await user.click(pauseButton)

      await waitFor(() => {
        const deleteButtons = screen.getAllByRole('button', {
          name: /delete title/i
        })

        expect(deleteButtons).toHaveLength(2)
        expect(deleteButtons[0]).toBeEnabled()
        expect(deleteButtons[1]).toBeEnabled()
      })
    })

    it('replaces pause button with resume/complete buttons', async () => {
      renderHomeScreen()

      const startButton = await screen.findByRole('button', {
        name: /start title1/i
      })
      await user.click(startButton)

      const pauseButton = await screen.findByRole('button', {
        name: /pause title1/i
      })
      await user.click(pauseButton)

      await waitFor(() => {
        expect(
          screen.queryByRole('button', { name: /pause title1/i })
        ).not.toBeInTheDocument()
        expect(
          screen.getByRole('button', { name: /resume title1/i })
        ).toBeInTheDocument()
        expect(
          screen.getByRole('button', { name: /complete title1/i })
        ).toBeInTheDocument()
      })
    })

    it('stops udpating actual duration of the task and total actual duration', async () => {
      renderHomeScreen()

      const firstTaskStartButton = await screen.findByRole('button', {
        name: /start title1/i
      })
      await user.click(firstTaskStartButton)

      const pauseButton = await screen.findByRole('button', {
        name: /pause title1/i
      })
      await user.click(pauseButton)

      const initialActualDur = screen.getAllByTestId('actual-duration')[0]
      const initialTotalActualDur = screen.getByTestId('total-actual-duration')

      setTimeout(() => {
        const currentActualDur = screen.getAllByTestId('actual-duration')[0]
        const currentTotalActualDur = screen.getByTestId(
          'total-actual-duration'
        )

        expect(initialActualDur).toEqual(currentActualDur)
        expect(initialTotalActualDur).toEqual(currentTotalActualDur)
      }, 3000)
    })

    it('stop updating progress bar to display remaining time', async () => {
      renderHomeScreen()

      const firstTaskStartButton = await screen.findByRole('button', {
        name: /start title1/i
      })

      await user.click(firstTaskStartButton)

      const pauseButton = await screen.findByRole('button', {
        name: /pause title1/i
      })

      setTimeout(async () => {
        await user.click(pauseButton)

        const initialProgressBarWidth =
          screen.getAllByTestId('bar')[0].clientWidth

        setTimeout(() => {
          const currentProgressBarWidth =
            screen.getAllByTestId('bar')[0].clientWidth
          expect(currentProgressBarWidth).toEqual(initialProgressBarWidth)
        }, 3000)
      }, 3000)
    })
  })
})
