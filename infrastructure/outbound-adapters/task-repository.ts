import {
  CreateTaskDto,
  GetTasksDto,
  UpdateTaskDto,
  TaskOutboundPort,
  DeleteTaskDto
} from '@timespark/domain/outbound-ports/task.outbound-port'
import { differenceInSeconds } from 'date-fns'
import { MemoryDatabase as taskDB } from '../lib/task-db'

async function resetTaskDB() {
  await taskDB.reset()
}

async function clearTaskDB() {
  await taskDB.clear()
}

async function createTask(taskData: CreateTaskDto) {
  return await taskDB.create(taskData)
}

async function getTasks({ from, to }: GetTasksDto) {
  return await taskDB.get({ from, to })
}

async function deleteTask({ id }: DeleteTaskDto) {
  await taskDB.remove(id)
  return { id }
}

async function startTask({ id, state, time }: UpdateTaskDto) {
  const task = await taskDB.getById(id)
  const newTask = {
    ...task,
    state,
    startTime: time
  }

  await taskDB.update(newTask)

  return newTask
}

async function pauseTask({ id, state, time }: UpdateTaskDto) {
  const task = await taskDB.getById(id)
  const newTask = {
    ...task,
    state,
    actualDuration:
      task.actualDuration +
      differenceInSeconds(new Date(time), new Date(task.startTime))
  }

  await taskDB.update(newTask)

  return newTask
}

async function completeTask({ id, state, time }: UpdateTaskDto) {
  const task = await taskDB.getById(id)

  const newTask = {
    ...task,
    state,
    endTime: time
  }

  await taskDB.update(newTask)

  return newTask
}

async function removeByCategory(categoryId: string) {
  await taskDB.removeByCategoryId(categoryId)
}

export const taskRepository: TaskOutboundPort = {
  resetTaskDB,
  clearTaskDB,
  createTask,
  getTasks,
  deleteTask,
  startTask,
  pauseTask,
  completeTask,
  removeByCategory
}
