import {
  CategoryRepository,
  CreateCategoryDto
} from '@timespark/domain/repositories'
import { httpAxios } from '../utils/http'

const client = httpAxios

export const categoryRepository: CategoryRepository = {
  createCategory: async ({ name }: CreateCategoryDto) =>
    await client('/category', { data: { name } }),
  getCategories: async () => await client('/categories')
}
