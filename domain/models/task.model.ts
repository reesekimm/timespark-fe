export type Task = {
  id: number
  createdTime: Date
  categoryId: string
  tags: string[]
  title: string
  estimatedDuration: number
  actualDuration: number
}
