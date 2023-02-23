import { render, screen, userEvent, waitFor } from '../utils/rtl-utils'
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

  userEvent.click(addButton)
}

describe('[CREATE TASK]', () => {
  it('can create a task and renders it in the table', async () => {
    renderHomeScreen()

    await fillOutTheForm()

    waitFor(() => {
      const firstRow = screen
        .getByRole('table')
        .querySelector('tbody > tr:first-child')
      expect(firstRow).toHaveTextContent(/none/i)
      expect(firstRow).toHaveTextContent(/test/i)
      expect(firstRow).toHaveTextContent('30')
      expect(firstRow).toHaveTextContent('0')
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

    waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        ERROR_MESSAGES.SERVER_DOWN
      )
    })
  })
})

describe('[RENDER TASKS]', () => {
  describe('if there is any task', () => {
    it('renders all tasks in the table', async () => {
      renderHomeScreen()

      waitFor(() => {
        const firstRow = screen
          .getByRole('table')
          .querySelector('tbody > tr:first-child')
        expect(firstRow).toHaveTextContent('명상')
        expect(firstRow).toHaveTextContent(/task of today/i)
        expect(firstRow).toHaveTextContent('20')
        expect(firstRow).toHaveTextContent('0')
      })
    })
  })

  describe('if there are no tasks', () => {
    beforeEach(() => {
      tasksDB.clear()
    })

    it('renders empty section', () => {
      renderHomeScreen()

      expect(screen.getByText(/add your first task :\)/i)).toBeInTheDocument()
    })
  })

  it('shows an error message when tasks fail to load', async () => {
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

describe('[DELETE TASK]', () => {
  it('can delete task from the table', async () => {
    renderHomeScreen()

    const deleteButtons = await screen.findAllByTitle('delete')

    // delete the first task
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

    waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        ERROR_MESSAGES.SERVER_DOWN
      )
    })
  })
})

describe('[START TASK]', () => {
  describe('on click start button', () => {
    // it('hides start button', () => {})
    // it('renders pause/finish buttons', () => {})
    // it('starts actual duration timer and updates total actual duration', () => {})
    // it('updates progress bar to display remaining time', () => {})
  })
})
