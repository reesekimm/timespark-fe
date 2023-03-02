import { Task, TaskState } from '../models'

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

export interface UpdateTaskDto {
  id: number
  state: TaskState
  time: string
}

export interface TaskRepository {
  createTask: (taskData: CreateTaskDto) => Promise<Task>
  getTasks: (period: GetTasksDto) => Promise<Task[]>
  deleteTask: ({ id }: DeleteTaskDto) => Promise<{ id: number }>
  updateTask: (taskData: UpdateTaskDto) => Promise<Task>
}
