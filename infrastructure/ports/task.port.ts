import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTasksDto,
  TaskRepository,
  UpdateTaskDto
} from '@timespark/domain/repositories'

export const taskPort = (repository: TaskRepository): TaskRepository => ({
  createTask: (taskData: CreateTaskDto) => repository.createTask(taskData),
  getTasks: (period: GetTasksDto) => repository.getTasks(period),
  deleteTask: ({ id }: DeleteTaskDto) => repository.deleteTask({ id }),
  updateTask: (taskData: UpdateTaskDto) => repository.updateTask(taskData)
})
