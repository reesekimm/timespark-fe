import { rest } from 'msw'
import * as tasksDB from '../tasks'

export const handlers = [
  rest.get('/tasks', (req, res, ctx) => {
    const from = req.url.searchParams.get('from') as string
    const to = req.url.searchParams.get('to') as string
    const result = tasksDB.get({ from, to })
    return res(ctx.status(200), ctx.json(result))
  }),
  rest.post('/task', async (req, res, ctx) => {
    const { taskData } = await req.json()
    const result = tasksDB.create(taskData)
    return res(ctx.status(200), ctx.json({ task: result }))
  })
]
