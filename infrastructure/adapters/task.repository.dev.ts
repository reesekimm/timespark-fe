import { TaskRepository } from '@timespark/domain/repositories'
import { MemoryDatabase } from '../lib/memory-database'

export const taskRepositoryDev: TaskRepository = {
  getTasks: async () => {
    return MemoryDatabase.getTasks()
  }
}
