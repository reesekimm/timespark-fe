import { Category } from '../models'

export interface CreateCategoryDto {
  name: string
}

export interface UpdateCategoryDto {
  id: string
  name: string
}

export interface DeleteCategoryDto {
  id: string
}

export interface CategoryRepository {
  createCategory: ({ name }: CreateCategoryDto) => Promise<Category>
  getCategories: () => Promise<Category[]>
  updateCategory: (categoryData: UpdateCategoryDto) => Promise<Category>
  deleteCategory: ({ id }: DeleteCategoryDto) => Promise<{ id: string }>
}
