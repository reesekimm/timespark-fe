export type Task = {
  id: number
  createdTime: string
  categoryId: string
  tags: string[]
  title: string
  estimatedDuration: number
  actualDuration: number
}
