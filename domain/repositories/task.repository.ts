import { Task } from '../models'

export interface CreateTaskDto {
  categoryName: string
  title: string
  estimatedDuration: number
}

export interface GetTasksDto {
  from: string
  to: string
}

export interface DeleteTaskDto {
  id: number
}

export interface StartTaskDto {
  id: number
  startTime: string
}

export interface PauseTaskDto {
  id: number
  actualDuration: number
}

export interface TaskRepository {
  createTask: (taskData: CreateTaskDto) => Promise<Task>
  getTasks: (period: GetTasksDto) => Promise<Task[]>
  deleteTask: ({ id }: DeleteTaskDto) => Promise<boolean>
  startTask: (taskData: StartTaskDto) => Promise<Task>
  pauseTask: (taskData: PauseTaskDto) => Promise<Task>
}
