import {
  CreateTaskDto,
  GetTasksDto,
  TaskRepository
} from '@timespark/domain/repositories'

export const taskPort = (repository: TaskRepository): TaskRepository => ({
  createTask: (taskData: CreateTaskDto) => repository.createTask(taskData),
  getTasks: (period: GetTasksDto) => repository.getTasks(period)
})
