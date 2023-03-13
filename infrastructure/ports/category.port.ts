import {
  CategoryRepository,
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain/repositories'

export const categoryPort = (
  repository: CategoryRepository
): CategoryRepository => ({
  createCategory: (categoryData: CreateCategoryDto) =>
    repository.createCategory(categoryData),
  getCategories: () => repository.getCategories(),
  updateCategory: (categoryData: UpdateCategoryDto) =>
    repository.updateCategory(categoryData),
  deleteCategory: ({ id }: DeleteCategoryDto) =>
    repository.deleteCategory({ id })
})
