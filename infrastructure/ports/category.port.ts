import {
  CategoryRepository,
  CreateCategoryDto
} from '@timespark/domain/repositories'

export const categoryPort = (
  repository: CategoryRepository
): CategoryRepository => ({
  createCategory: ({ name }: CreateCategoryDto) =>
    repository.createCategory({ name }),
  getCategories: () => repository.getCategories()
})
