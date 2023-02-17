import {
  CreateTaskDto,
  GetTasksDto,
  TaskRepository
} from '@timespark/domain/repositories'
import { MemoryDatabase } from '../lib/memory-database'

export const taskRepositoryDev: TaskRepository = {
  createTask: (taskData: CreateTaskDto) => MemoryDatabase.createTask(taskData),
  getTasks: (period: GetTasksDto) => MemoryDatabase.getTasks(period)
}
