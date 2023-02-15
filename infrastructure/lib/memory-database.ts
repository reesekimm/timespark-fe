import { Task } from '@timespark/domain/models'
import { CreateTaskDto } from '@timespark/domain/repositories'

export const MemoryDatabase = (() => {
  const tasks = [] as Task[]

  const defaultTask = {
    id: 1,
    createdTime: new Date(),
    categoryId: '1',
    tags: [],
    title: '',
    estimatedDuration: 0,
    actualDuration: 0
  }

  return {
    createTask: (taskData: CreateTaskDto) => {
      tasks.push({ ...defaultTask, ...taskData, id: tasks.length + 1 })
      return Promise.resolve(true)
    },
    getTasks: () => {
      return Promise.resolve(tasks)
    }
  }
})()
