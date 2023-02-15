import { CreateTaskDto, TaskRepository } from '@timespark/domain/repositories'
import { MemoryDatabase } from '../lib/memory-database'

export const taskRepositoryDev: TaskRepository = {
  createTask: async (taskData: CreateTaskDto) => {
    return MemoryDatabase.createTask(taskData)
  }
}
