import { Category } from '@timespark/domain/models'
import { CreateCategoryDto } from '@timespark/domain/repositories'
import { v4 as uuidv4 } from 'uuid'
import categoriesData from './data/categories.json'

const categories: Category[] = [...categoriesData]

function create({ name }: CreateCategoryDto) {
  const newCategory = {
    id: uuidv4(),
    name
  }

  categories.push(newCategory)

  return newCategory
}

function get() {
  return categories
}

export { create, get }
