import { Task } from '@timespark/domain/models'
import { CreateTaskDto, GetTasksDto } from '@timespark/domain/repositories'
import { isAfter, isBefore, sub } from 'date-fns'

export const MemoryDatabase = (() => {
  const tasks = [
    {
      id: 1,
      createdTime: sub(new Date(), { days: 1 }),
      categoryId: '1',
      tags: [],
      title: 'task 1 for yesterday',
      estimatedDuration: 10,
      actualDuration: 0
    },
    {
      id: 2,
      createdTime: sub(new Date(), { days: 1 }),
      categoryId: '1',
      tags: [],
      title: 'task 2 for yesterday',
      estimatedDuration: 10,
      actualDuration: 0
    }
  ] as Task[]

  const defaultTask = {
    id: 0,
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
    getTasks: ({ from, to }: GetTasksDto) => {
      const result = tasks.filter(
        ({ createdTime }) =>
          isAfter(createdTime, from) && isBefore(createdTime, to)
      )
      return Promise.resolve(result)
    }
  }
})()
