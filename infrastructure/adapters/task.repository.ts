import { CreateTaskDto, TaskRepository } from '@timespark/domain/repositories'
import { Http } from '../types'
import { httpAxios } from '../utils/http'

const client: Http = httpAxios

export const taskRepository: TaskRepository = {
  createTask: (taskData: CreateTaskDto) =>
    client.post<boolean>('/task', { taskData })
}
