import { Category } from '../models'

export interface CreateCategoryDto {
  name: string
}

export interface CategoryRepository {
  createCategory: ({ name }: CreateCategoryDto) => Promise<Category>
  getCategories: () => Promise<Category[]>
}
