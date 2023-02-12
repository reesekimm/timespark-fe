import { TaskRepository } from '@timespark/domain/repositories'

export interface TaskDto {
  id: string
  created_at: Date
  category: string
  tags: string[]
  title: string
  estimated_time: number
  actual_time: number
}

export const taskPort = (repository: TaskRepository): TaskRepository => ({
  getTasks: () => repository.getTasks()
})
