import { Category } from '../models'

export interface CreateCategoryDto {
  name: string
  color: string
}

export interface UpdateCategoryDto {
  id: string
  name: string
  color: string
}

export interface DeleteCategoryDto {
  id: string
}

export interface CategoryRepository {
  createCategory: (categoryData: CreateCategoryDto) => Promise<Category>
  getCategories: () => Promise<Category[]>
  updateCategory: (categoryData: UpdateCategoryDto) => Promise<Category>
  deleteCategory: ({ id }: DeleteCategoryDto) => Promise<{ id: string }>
}
