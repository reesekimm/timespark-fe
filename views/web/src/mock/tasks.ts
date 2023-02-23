import { Task } from '@timespark/domain/models'
import { CreateTaskDto, GetTasksDto } from '@timespark/domain/repositories'
import { isAfter, isBefore, isEqual, parseISO } from 'date-fns'
import tasksData from './data/tasks.json'

let tasks = [...tasksData]

function reset() {
  const defaultTask: Task = {
    id: 100,
    createdTime: new Date().toISOString(),
    startTime: '',
    endTime: '',
    categoryName: 'None',
    tags: [],
    title: 'task of today',
    actualDuration: 0,
    estimatedDuration: 20,
    state: 'created'
  }

  tasks = [...tasksData, defaultTask]
}

function clear() {
  tasks = []
}

function create(taskData: CreateTaskDto) {
  tasks.push({
    id: tasks.length + 1,
    createdTime: new Date().toISOString(),
    startTime: '',
    endTime: '',
    state: 'created',
    actualDuration: 0,
    tags: [],
    ...taskData
  })

  return tasks
}

function get({ from, to }: GetTasksDto) {
  return tasks.filter(
    ({ createdTime }) =>
      (isEqual(parseISO(createdTime), parseISO(from)) ||
        isAfter(parseISO(createdTime), parseISO(from))) &&
      isBefore(parseISO(createdTime), parseISO(to))
  )
}

function remove(id: number) {
  tasks = tasks.filter((task) => task.id !== id)
  return tasks
}

export { reset, clear, create, get, remove }
