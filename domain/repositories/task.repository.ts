import { Task } from '../models'

export interface TaskRepository {
  getTasks: () => Promise<Task[]>
}
