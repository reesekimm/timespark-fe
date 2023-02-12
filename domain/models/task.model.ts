export type Task = {
  id: string
  created_at: Date
  category: string
  tags: string[]
  title: string
  estimated_time: number
  actual_time: number
}
