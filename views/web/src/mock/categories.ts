import { Category } from '@timespark/domain/models'
import {
  CreateCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain/repositories'
import { HttpError } from '@timespark/infrastructure'
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

function update({ id, name }: UpdateCategoryDto) {
  validateCategory(id)
  const categoryIndex = categories.findIndex((category) => category.id === id)
  const newCategory = {
    ...categories[categoryIndex],
    name
  }

  categories[categoryIndex] = newCategory

  return newCategory
}

function validateCategory(id: string) {
  if (categories.findIndex((category) => category.id === id) < 0) {
    throw new HttpError({
      name: 'NotFound',
      message: `No task with the id '${id}'`,
      status: 404
    })
  }
}

export { create, get, update }
