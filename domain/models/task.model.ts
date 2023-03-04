export type TaskState = 'created' | 'start' | 'pause' | 'continue' | 'complete'

export type Task = {
  id: string
  createdTime: string
  startTime: string
  endTime: string
  categoryId: string
  tags: string[]
  title: string
  estimatedDuration: number
  actualDuration: number
  state: TaskState
}
