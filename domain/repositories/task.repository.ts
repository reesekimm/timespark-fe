export interface CreateTaskDto {
  categoryId: string
  title: string
  estimatedDuration: number
}

export interface TaskRepository {
  createTask: (taskData: CreateTaskDto) => Promise<boolean>
}
