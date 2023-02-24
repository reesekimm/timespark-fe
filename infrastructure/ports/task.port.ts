import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTasksDto,
  StartTaskDto,
  TaskRepository
} from '@timespark/domain/repositories'

export const taskPort = (repository: TaskRepository): TaskRepository => ({
  createTask: (taskData: CreateTaskDto) => repository.createTask(taskData),
  getTasks: (period: GetTasksDto) => repository.getTasks(period),
  deleteTask: ({ id }: DeleteTaskDto) => repository.deleteTask({ id }),
  startTask: (taskData: StartTaskDto) => repository.startTask(taskData)
})
