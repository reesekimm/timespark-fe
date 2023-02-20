import {
  renderWithRouter,
  screen,
  userEvent,
  waitFor,
  within
} from '../utils/rtl-utils'
import * as tasksDB from '../mock/tasks'
import { server } from '../mock/server/test-server'
import { rest } from 'msw'
import { ERROR_MESSAGES } from '../utils/constants'

function renderHomeScreen() {
  return renderWithRouter({ route: '/' })
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

  await userEvent.type(taskInput, 'task1')

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

  userEvent.click(addButton)
}

describe('[CREATE TASK]', () => {
  test('can create a task and renders it on the list', async () => {
    renderHomeScreen()

    await fillOutTheForm()

    waitFor(() => {
      const list = screen.getByRole('list')
      expect(
        within(list).getByText(/none/i, { exact: false })
      ).toBeInTheDocument()
      expect(within(list).getByText('task1')).toBeInTheDocument()
      expect(within(list).getByText('30', { exact: false })).toBeInTheDocument()
    })
  })

  test('shows an error message when create task fails', async () => {
    server.use(
      rest.post('/task', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    renderHomeScreen()

    await fillOutTheForm()

    waitFor(() => {
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

    test('renders all tasks on the list', async () => {
      renderHomeScreen()

      const taskList = await screen.findByRole('list', { name: 'tasks' })
      const tasks = await within(taskList).findAllByRole('listitem')

      expect(tasks).toHaveLength(1)
    })
  })

  describe('if no tasks exist', () => {
    beforeEach(() => {
      tasksDB.clear()
    })

    test('renders guide message', async () => {
      renderHomeScreen()

      expect(
        await screen.findByText(/Add your first task/i)
      ).toBeInTheDocument()
    })
  })

  test('shows an error message when tasks fail to load', async () => {
    server.use(
      rest.get('/tasks', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    renderHomeScreen()

    waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        ERROR_MESSAGES.SERVER_DOWN
      )
    })
  })
})
