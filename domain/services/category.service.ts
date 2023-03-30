import {
  CategoryInboundPort,
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto
} from '../inbound-ports/category.inbound-port'
import { CategoryOutboundPort } from '../outbound-ports/category.outbound-port'

export const categoryService = (
  categoryRepository: CategoryOutboundPort
): CategoryInboundPort => ({
  createCategory: async (categoryData: CreateCategoryDto) =>
    categoryRepository.createCategory(categoryData),
  getCategories: async () => categoryRepository.getCategories(),
  updateCategory: async (categoryData: UpdateCategoryDto) =>
    categoryRepository.updateCategory(categoryData),
  deleteCategory: async ({ id }: DeleteCategoryDto) =>
    categoryRepository.deleteCategory({ id })
})
