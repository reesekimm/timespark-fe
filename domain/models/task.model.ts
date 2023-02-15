export type Task = {
  id: number
  createdTime: Date
  categoryId: number
  tags: string[]
  title: string
  estimatedDuration: number
  actualDuration: number
}
