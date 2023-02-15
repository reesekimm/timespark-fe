export interface CreateTaskDto {
  categoryId: number
  title: string
  estimatedDuration: number
}

export interface TaskRepository {
  createTask: (taskData: CreateTaskDto) => Promise<boolean>
}
