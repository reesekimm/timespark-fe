import {
  CategoryInboundPort,
  CreateCategoryDto,
  CreateTaskDto,
  DeleteCategoryDto,
  DeleteTaskDto,
  GetTasksDto,
  TaskInboundPort,
  UpdateCategoryDto,
  UpdateTaskDto
} from '@timespark/domain'
import { httpClient } from './lib/http'

export const taskClient: TaskInboundPort = {
  resetTasks: async () => await httpClient('/tasks/reset', { method: 'PUT' }),
  clearTasks: async () => await httpClient('/tasks/clear', { method: 'PUT' }),
  createTask: async (taskData: CreateTaskDto) =>
    await httpClient('/task', { data: taskData }),
  getTasks: async ({ from, to }: GetTasksDto) =>
    await httpClient('/tasks', { params: { from, to } }),
  deleteTask: async ({ id }: DeleteTaskDto) =>
    await httpClient(`/task/${id}`, { method: 'DELETE' }),
  updateTask: async (taskData: UpdateTaskDto) =>
    await httpClient(`/task/${taskData.id}`, {
      method: 'PUT',
      data: taskData
    })
}

export const categoryClient: CategoryInboundPort = {
  createCategory: async (categoryData: CreateCategoryDto) =>
    await httpClient('/category', { data: categoryData }),
  getCategories: async () => await httpClient('/categories'),
  updateCategory: async (categoryData: UpdateCategoryDto) =>
    await httpClient(`/category/${categoryData.id}`, {
      method: 'PUT',
      data: categoryData
    }),
  deleteCategory: async ({ id }: DeleteCategoryDto) =>
    await httpClient(`/category/${id}`, { method: 'DELETE' })
}
