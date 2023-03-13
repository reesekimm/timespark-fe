import { HttpError } from '@timespark/infrastructure'
import { rest } from 'msw'
import * as tasksDB from '../tasks'
import * as categoriesDB from '../categories'

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
    const taskData = await req.json()
    try {
      const result = tasksDB.create(taskData)
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.delete('/task/:id', async (req, res, ctx) => {
    const { id } = req.params
    try {
      const result = tasksDB.remove(id as string)
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.put('/task/:id', async (req, res, ctx) => {
    const taskData = await req.json()
    let result

    try {
      if (taskData.state === 'start' || taskData.state === 'continue') {
        result = tasksDB.start(taskData)
      } else if (taskData.state === 'pause') {
        result = tasksDB.pause(taskData)
      } else {
        result = tasksDB.complete(taskData)
      }

      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.get('/categories', (req, res, ctx) => {
    try {
      const result = categoriesDB.get()
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.post('/category', async (req, res, ctx) => {
    const categoryData = await req.json()
    try {
      const result = categoriesDB.create(categoryData)
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.put('/category/:id', async (req, res, ctx) => {
    const categoryData = await req.json()
    try {
      const result = categoriesDB.update(categoryData)
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.delete('/category/:id', async (req, res, ctx) => {
    const { id } = req.params
    try {
      const result = categoriesDB.remove(id as string)
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  })
]
