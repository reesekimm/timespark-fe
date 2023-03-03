export type TaskState = 'created' | 'start' | 'pause' | 'continue' | 'complete'

export type Task = {
  id: number
  createdTime: string
  startTime: string
  endTime: string
  categoryId: number
  tags: string[]
  title: string
  estimatedDuration: number
  actualDuration: number
  state: TaskState
}

export type Category = {
  id: number
  name: string
}
