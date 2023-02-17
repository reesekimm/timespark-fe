import { Task } from '@timespark/domain/models'
import { CreateTaskDto, GetTasksDto } from '@timespark/domain/repositories'
import { isAfter, isBefore, isEqual, parseISO } from 'date-fns'

export const MemoryDatabase = (() => {
  const tasks = [
    {
      id: 1,
      createdTime: '2023-02-15T15:05:00.000Z',
      categoryId: '1',
      tags: [],
      title: 'task 1 for yesterday',
      estimatedDuration: 10,
      actualDuration: 0
    },
    {
      id: 2,
      createdTime: '2023-02-16T20:32:00.000Z',
      categoryId: '1',
      tags: [],
      title: 'task 2 for yesterday',
      estimatedDuration: 10,
      actualDuration: 0
    }
  ] as Task[]

  return {
    createTask: (taskData: CreateTaskDto) => {
      tasks.push({
        id: tasks.length + 1,
        createdTime: new Date().toISOString(),
        actualDuration: 0,
        tags: [],
        ...taskData
      })
      return Promise.resolve(true)
    },
    getTasks: ({ from, to }: GetTasksDto) => {
      const result = tasks.filter(
        ({ createdTime }) =>
          (isEqual(parseISO(createdTime), parseISO(from)) ||
            isAfter(parseISO(createdTime), parseISO(from))) &&
          isBefore(parseISO(createdTime), parseISO(to))
      )
      return Promise.resolve(result)
    }
  }
})()
