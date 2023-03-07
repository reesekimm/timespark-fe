import { Task } from '@timespark/domain/models'
import TimerWorker from '../workers/timer.worker?worker'
import {
  setActiveTask as setCurrentActiveTask,
  setQueryDataForTasks
} from './query-tasks'

const timerWorker = new TimerWorker()

export const setActiveTask = (task: Task) => {
  timerWorker.postMessage({ action: 'set', data: task })
}

export const requestActiveTask = () => {
  timerWorker.postMessage({ action: 'get' })
}

export const removeActiveTask = () => {
  timerWorker.postMessage({ action: 'remove' })
}

timerWorker.onmessage = (event: MessageEvent<string>) => {
  const { action, data } = event.data

  switch (action) {
    case 'getActiveTask':
      setCurrentActiveTask(data)
      break
    case 'setActiveTask':
      setQueryDataForTasks(data)
      break
    case 'removeActiveTask':
      setCurrentActiveTask(null)
      break
    default:
      return
  }
}
