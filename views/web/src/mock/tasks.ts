import { Task, TaskState } from '@timespark/domain/models'
import {
  CreateTaskDto,
  GetTasksDto,
  UpdateTaskDto
} from '@timespark/domain/repositories'
import { HttpError } from '@timespark/infrastructure'
import {
  differenceInSeconds,
  isAfter,
  isBefore,
  isEqual,
  parseISO
} from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import tasksData from './data/tasks.json'

let tasks = [...tasksData]

function reset() {
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

  tasks = [...tasksData, defaultTask]
}

function clear() {
  tasks = []
}

function create(taskData: CreateTaskDto) {
  const newTask = {
    id: uuidv4(),
    createdTime: new Date().toISOString(),
    startTime: '',
    endTime: '',
    state: 'created',
    actualDuration: 0,
    tags: [],
    ...taskData
  }

  tasks.push(newTask)

  return newTask
}

function get({ from, to }: GetTasksDto) {
  return tasks.filter(
    ({ createdTime }) =>
      (isEqual(parseISO(createdTime), parseISO(from)) ||
        isAfter(parseISO(createdTime), parseISO(from))) &&
      isBefore(parseISO(createdTime), parseISO(to))
  )
}

function remove(id: string) {
  tasks = tasks.filter((task) => task.id !== id)

  return { id }
}

function start({ id, state, time }: UpdateTaskDto) {
  validateTask(id)
  const taskIndex = tasks.findIndex((task) => task.id === id)
  const newTask = {
    ...tasks[taskIndex],
    state,
    startTime: time
  }

  tasks[taskIndex] = newTask

  return newTask
}

function pause({ id, state, time }: UpdateTaskDto) {
  validateTask(id)
  const taskIndex = tasks.findIndex((task) => task.id === id)
  const newTask = {
    ...tasks[taskIndex],
    state,
    actualDuration:
      tasks[taskIndex].actualDuration +
      differenceInSeconds(new Date(time), new Date(tasks[taskIndex].startTime))
  }

  tasks[taskIndex] = newTask

  return newTask
}

function complete({ id, state, time }: UpdateTaskDto) {
  validateTask(id)
  const taskIndex = tasks.findIndex((task) => task.id === id)
  const newTask = {
    ...tasks[taskIndex],
    state,
    endTime: time
  }

  tasks[taskIndex] = newTask

  return newTask
}

function removeByCategory(categoryId: string) {
  tasks = tasks.filter((task) => task.categoryId !== categoryId)

  return tasks
}

function validateTask(id: string) {
  if (tasks.findIndex((task) => task.id === id) < 0) {
    throw new HttpError({
      name: 'NotFound',
      message: `No task with the id '${id}'`,
      status: 404
    })
  }
}

export {
  reset,
  clear,
  create,
  get,
  remove,
  start,
  pause,
  complete,
  removeByCategory
}
