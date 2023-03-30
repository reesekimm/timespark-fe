import { Category } from '../models/category.model'

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

export interface CategoryInboundPort {
  createCategory: (categoryData: CreateCategoryDto) => Promise<Category>
  getCategories: () => Promise<Category[]>
  updateCategory: (categoryData: UpdateCategoryDto) => Promise<Category>
  deleteCategory: ({ id }: DeleteCategoryDto) => Promise<{ id: string }>
}
