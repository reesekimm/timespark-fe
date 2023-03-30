import {
  CategoryOutboundPort,
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain/outbound-ports/category.outbound-port'
import { MemoryDatabase as categoryDB } from '../lib/category-db'
import { taskRepository } from './task-repository'

async function createCategory(categoryData: CreateCategoryDto) {
  return await categoryDB.create(categoryData)
}

async function getCategories() {
  return await categoryDB.get()
}

async function updateCategory(categoryData: UpdateCategoryDto) {
  return await categoryDB.update(categoryData)
}

async function deleteCategory({ id }: DeleteCategoryDto) {
  await categoryDB.remove(id)
  taskRepository.removeByCategory(id)
  return { id }
}

export const categoryRepository: CategoryOutboundPort = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
}
