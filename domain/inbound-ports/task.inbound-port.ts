import { Task, TaskState } from '../models/task.model'

export interface CreateTaskDto {
  categoryId: string
  title: string
  estimatedDuration: number
}

export interface GetTasksDto {
  from: string
  to: string
}

export interface DeleteTaskDto {
  id: string
}

export interface UpdateTaskDto {
  id: string
  state: TaskState
  time: string
}

export interface TaskInboundPort {
  resetTasks: () => void
  clearTasks: () => void
  createTask: (taskData: CreateTaskDto) => Promise<Task>
  getTasks: (period: GetTasksDto) => Promise<Task[]>
  deleteTask: ({ id }: DeleteTaskDto) => Promise<{ id: string }>
  updateTask: (taskData: UpdateTaskDto) => Promise<Task>
}
