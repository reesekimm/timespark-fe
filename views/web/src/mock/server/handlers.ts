import { rest } from 'msw'
import { DeleteCategoryDto, DeleteTaskDto } from '@timespark/domain'
import {
  categoryService,
  HttpError,
  taskService
} from '@timespark/infrastructure'

// handler: inbound adapter (controller) 역할 수행
export const handlers = [
  rest.put('/tasks/reset', async (req, res, ctx) => {
    try {
      await taskService.resetTasks()
      return res(ctx.status(200))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.put('/tasks/clear', async (req, res, ctx) => {
    try {
      await taskService.clearTasks()
      return res(ctx.status(200))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.get('/tasks', async (req, res, ctx) => {
    const from = req.url.searchParams.get('from') as string
    const to = req.url.searchParams.get('to') as string

    try {
      const result = await taskService.getTasks({ from, to })
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
      const result = await taskService.createTask(taskData)
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.delete('/task/:id', async (req, res, ctx) => {
    const { id } = req.params as unknown as DeleteTaskDto

    try {
      const result = await taskService.deleteTask({ id })
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
      result = await taskService.updateTask(taskData)
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.get('/categories', async (req, res, ctx) => {
    try {
      const result = await categoryService.getCategories()
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
      const result = await categoryService.createCategory(categoryData)
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
      const result = await categoryService.updateCategory(categoryData)
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  }),
  rest.delete('/category/:id', async (req, res, ctx) => {
    const { id } = req.params as unknown as DeleteCategoryDto
    try {
      const result = await categoryService.deleteCategory({ id })
      return res(ctx.status(200), ctx.json(result))
    } catch (error) {
      const message =
        error instanceof HttpError ? error.message : 'Unknown Error'
      return res(ctx.json({ message }))
    }
  })
]
