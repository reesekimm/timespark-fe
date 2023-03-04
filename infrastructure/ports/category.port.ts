import {
  CategoryRepository,
  CreateCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain/repositories'

export const categoryPort = (
  repository: CategoryRepository
): CategoryRepository => ({
  createCategory: ({ name }: CreateCategoryDto) =>
    repository.createCategory({ name }),
  getCategories: () => repository.getCategories(),
  updateCategory: (categoryData: UpdateCategoryDto) =>
    repository.updateCategory(categoryData)
})
