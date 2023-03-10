import { Task } from '@timespark/domain/models'
import TimerWorker from '../workers/timer.worker?worker'
import {
  setActiveTask as setActiveTaskInMainThread,
  setQueryDataForTasks
} from './query-tasks'

const timerWorker = new TimerWorker()

export const setActiveTask = (task: Task) => {
  timerWorker.postMessage({ action: 'set', data: task })
}

export const getActiveTask = () => {
  timerWorker.postMessage({ action: 'get' })
}

export const removeActiveTask = () => {
  timerWorker.postMessage({ action: 'remove' })
}

type TimerWorkerUtilType =
  | {
      action: 'getActiveTask' | 'setActiveTask'
      data: Task
    }
  | { action: 'removeActiveTask'; data?: undefined }

timerWorker.onmessage = (event: MessageEvent<string>) => {
  const { action, data } = event.data as unknown as TimerWorkerUtilType

  switch (action) {
    case 'getActiveTask':
      setActiveTaskInMainThread(data)
      break
    case 'setActiveTask':
      setQueryDataForTasks(data)
      break
    case 'removeActiveTask':
      setActiveTaskInMainThread(null)
      break
    default:
      return
  }
}
