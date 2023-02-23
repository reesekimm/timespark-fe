import { Task } from '@timespark/domain/models'
import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTasksDto,
  TaskRepository
} from '@timespark/domain/repositories'
import { Http } from '../types'
import { httpAxios } from '../utils/http'

const client: Http = httpAxios

export const taskRepository: TaskRepository = {
  createTask: async (taskData: CreateTaskDto) =>
    await client.post<boolean>('/task', { taskData }),
  getTasks: async ({ from, to }: GetTasksDto) =>
    await client.get<Task[]>('/tasks', { from, to }),
  deleteTask: async ({ id }: DeleteTaskDto) =>
    await client.delete<boolean>(`/task/${id}`)
}
