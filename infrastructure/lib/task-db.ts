import { Task, TaskState } from '@timespark/domain'
import {
  CreateTaskDto,
  GetTasksDto
} from '@timespark/domain/outbound-ports/task.outbound-port'
import { isAfter, isBefore, isEqual, parseISO } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import tasksData from './data/tasks.json'

export const MemoryDatabase = (() => {
  let tasks = [...tasksData] as Task[]

  const reset = async () => {
    const defaultTask: Task = {
      id: uuidv4(),
      createdTime: new Date().toISOString(),
      startTime: '',
      endTime: '',
      categoryId: uuidv4(),
      tags: [],
      title: 'task of today',
      actualDuration: 0,
      estimatedDuration: 20 * 60,
      state: 'created' as TaskState
    }

    tasks = [...(tasksData as Task[]), defaultTask]
  }

  const clear = async () => {
    tasks = []
  }

  const create = async (taskData: CreateTaskDto) => {
    const newTask = {
      id: uuidv4(),
      createdTime: new Date().toISOString(),
      startTime: '',
      endTime: '',
      state: 'created' as TaskState,
      actualDuration: 0,
      tags: [],
      ...taskData
    }

    tasks.push(newTask)

    return Promise.resolve(newTask)
  }

  const get = async ({ from, to }: GetTasksDto) => {
    const result = tasks.filter(
      ({ createdTime }) =>
        (isEqual(parseISO(createdTime), parseISO(from)) ||
          isAfter(parseISO(createdTime), parseISO(from))) &&
        isBefore(parseISO(createdTime), parseISO(to))
    )

    return Promise.resolve(result)
  }

  const getById = async (id: string) => {
    validate(id)
    const result = tasks.find((task) => task.id === id) as Task
    return Promise.resolve(result)
  }

  const remove = async (id: string) => {
    validate(id)
    tasks = tasks.filter((task) => task.id !== id)
    return Promise.resolve(id)
  }

  const update = async (task: Task) => {
    validate(task.id)
    const taskIndex = tasks.findIndex((taskData) => taskData.id === task.id)
    tasks[taskIndex] = task
  }

  const validate = (id: string) => {
    if (tasks.findIndex((task) => task.id === id) < 0) {
      throw new Error(`No task with the id '${id}'`)
    }
  }

  const removeByCategoryId = (categoryId: string) => {
    tasks = tasks.filter((task) => task.categoryId !== categoryId)
    return Promise.resolve(tasks)
  }

  return {
    reset,
    clear,
    create,
    get,
    getById,
    remove,
    removeByCategoryId,
    update
  }
})()
