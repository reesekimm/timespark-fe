export type TaskState = 'created' | 'start' | 'pause' | 'continue' | 'end'

export type Task = {
  id: number
  createdTime: string
  startTime: string
  endTime: string
  categoryName: string
  tags: string[]
  title: string
  estimatedDuration: number
  actualDuration: number
  state: TaskState
}
