import {
  CreateTaskDto,
  GetTasksDto,
  TaskRepository
} from '@timespark/domain/repositories'
import { MemoryDatabase } from '../lib/memory-database'

export const taskRepositoryDev: TaskRepository = {
  createTask: (taskData: CreateTaskDto) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(MemoryDatabase.createTask(taskData))
      }, 1000)
    }),
  getTasks: (period: GetTasksDto) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(MemoryDatabase.getTasks(period))
      }, 1000)
    })
}
