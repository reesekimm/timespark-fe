import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTasksDto,
  TaskRepository
} from '@timespark/domain/repositories'
import { httpAxios } from '../utils/http'

const client = httpAxios

export const taskRepository: TaskRepository = {
  createTask: async (taskData: CreateTaskDto) =>
    await client('/task', { data: taskData }),
  getTasks: async ({ from, to }: GetTasksDto) =>
    await client('/tasks', { params: { from, to } }),
  deleteTask: async ({ id }: DeleteTaskDto) =>
    await client(`/task/${id}`, { method: 'DELETE' })
}
