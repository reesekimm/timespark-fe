import { TaskDto } from '../ports'

export const MemoryDatabase = (() => {
  const tasks = [
    {
      id: 'uuid',
      created_at: new Date(),
      category: 'dev',
      tags: ['project'],
      title: 'first task',
      estimated_time: 30,
      actual_time: 20
    }
  ] as TaskDto[]

  return {
    getTasks: () => Promise.resolve(tasks)
  }
})()
