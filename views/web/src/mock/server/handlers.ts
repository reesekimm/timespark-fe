import { HttpError } from '@timespark/infrastructure'
import { rest } from 'msw'
import * as tasksDB from '../tasks'

export const handlers = [
  rest.get('/tasks', (req, res, ctx) => {
    const from = req.url.searchParams.get('from') as string
    const to = req.url.searchParams.get('to') as string
    try {
      const result = tasksDB.get({ from, to })
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.post('/task', async (req, res, ctx) => {
    const { taskData } = await req.json()
    try {
      const result = tasksDB.create(taskData)
      return res(ctx.status(200), ctx.json({ task: result }))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.delete('/task/:id', async (req, res, ctx) => {
    const { id } = req.params
    try {
      tasksDB.remove(Number(id))
      return res(ctx.status(200), ctx.json({ success: true }))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  })
]
