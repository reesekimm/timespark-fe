import { Task } from '@timespark/domain'

const dbName = 'timeSpark'
const storeName = 'activeTasks'

const DBOpenRequest: IDBOpenDBRequest = indexedDB.open(dbName, 1)
let db: IDBDatabase

let timerId: number

DBOpenRequest.onupgradeneeded = function () {
  console.log('[ObjectStore created]')

  db = DBOpenRequest.result
  db.createObjectStore(storeName, { keyPath: 'id' })
}

DBOpenRequest.onsuccess = function (event) {
  console.log('[Success opening database]', event)

  db = DBOpenRequest.result
}

DBOpenRequest.onerror = function (event) {
  console.log('[Error opening database]', event)
}

function set(task: Task) {
  let time = task.actualDuration

  const update = () => {
    const taskObj = {
      ...task,
      actualDuration: time + 1
    }

    const updateRequest = db
      .transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .put({
        ...taskObj,
        timerId
      })

    updateRequest.onsuccess = function () {
      self.postMessage({ action: 'setActiveTask', data: taskObj })
    }

    updateRequest.onerror = function (event) {
      console.log('Error updating object:', event)
    }

    time += 1
  }

  timerId = setInterval(update, 1000)
}

function get() {
  const getRequest = db
    .transaction(storeName, 'readonly')
    .objectStore(storeName)
    .getAll()

  getRequest.onsuccess = function () {
    self.postMessage({
      action: 'getActiveTask',
      data: getRequest.result[0]
    })
  }

  getRequest.onerror = function (event) {
    console.log('[Error get object]', event)
  }
}

function remove() {
  clearInterval(timerId)

  const clearRequest = db
    .transaction(storeName, 'readwrite')
    .objectStore(storeName)
    .clear()

  clearRequest.onsuccess = () => {
    self.postMessage({ action: 'removeActiveTask' })
  }

  clearRequest.onerror = (event) => {
    console.log('Error clearing object:', event)
  }
}

type TimerWorkerType =
  | {
      action: 'get' | 'remove'
      data?: undefined
    }
  | {
      action: 'set'
      data: Task
    }

self.onmessage = (event: MessageEvent<string>) => {
  const { action, data } = event.data as unknown as TimerWorkerType

  switch (action) {
    case 'get':
      get()
      break
    case 'set':
      set(data)
      break
    case 'remove':
      remove()
      break
    default:
      return
  }
}

export {}
