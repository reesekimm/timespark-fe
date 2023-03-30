import { categoryService, taskService } from '@timespark/domain'
import { categoryRepository } from './outbound-adapters/category-repository'
import { taskRepository } from './outbound-adapters/task-repository'

const cService = categoryService(categoryRepository)
const tService = taskService(taskRepository)

export { cService as categoryService, tService as taskService }

export * from './client'
export * from './lib/http'
