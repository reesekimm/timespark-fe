import {
  CategoryRepository,
  CreateCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain/repositories'
import { httpAxios } from '../utils/http'

const client = httpAxios

export const categoryRepository: CategoryRepository = {
  createCategory: async (categoryData: CreateCategoryDto) =>
    await client('/category', { data: categoryData }),
  getCategories: async () => await client('/categories'),
  updateCategory: async (categoryData: UpdateCategoryDto) =>
    await client(`/category/${categoryData.id}`, {
      method: 'PUT',
      data: categoryData
    }),
  deleteCategory: async ({ id }) =>
    await client(`/category/${id}`, { method: 'DELETE' })
}
