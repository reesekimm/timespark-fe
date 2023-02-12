import { TaskRepository } from '@timespark/domain/repositories'
import { TaskDto } from '../ports'
import { Http } from '../types'
import { httpAxios } from '../utils/http'

const client: Http = httpAxios

export const taskRepository: TaskRepository = {
  getTasks: async () => {
    return client.get<TaskDto[]>('/tasks')
  }
}
