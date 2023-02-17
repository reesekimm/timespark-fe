import { Task } from '../models'

export interface CreateTaskDto {
  categoryId: string
  title: string
  estimatedDuration: number
}

export interface GetTasksDto {
  from: Date
  to: Date
}

export interface TaskRepository {
  createTask: (taskData: CreateTaskDto) => Promise<boolean>
  getTasks: (period: GetTasksDto) => Promise<Task[]>
}
