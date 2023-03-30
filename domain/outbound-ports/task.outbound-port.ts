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

export interface TaskOutboundPort {
  resetTaskDB: () => void
  clearTaskDB: () => void
  createTask: (taskData: CreateTaskDto) => Promise<Task>
  getTasks: ({ from, to }: GetTasksDto) => Promise<Task[]>
  deleteTask: ({ id }: DeleteTaskDto) => Promise<{ id: string }>
  startTask: (taskData: UpdateTaskDto) => Promise<Task>
  pauseTask: (taskData: UpdateTaskDto) => Promise<Task>
  completeTask: (taskData: UpdateTaskDto) => Promise<Task>
  removeByCategory: (categoryId: string) => void
}
