import {
  CreateCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain/outbound-ports/category.outbound-port'
import { v4 as uuidv4 } from 'uuid'

import categoriesData from './data/categories.json'

export const MemoryDatabase = (() => {
  let categories = [...categoriesData]

  const create = ({ name, color }: CreateCategoryDto) => {
    const newCategory = {
      id: uuidv4(),
      name,
      color
    }

    categories.push(newCategory)

    return Promise.resolve(newCategory)
  }

  function get() {
    return Promise.resolve(categories)
  }

  function update({ id, name, color }: UpdateCategoryDto) {
    validate(id)

    const categoryIndex = categories.findIndex((category) => category.id === id)
    const newCategory = {
      ...categories[categoryIndex],
      name,
      color
    }

    categories[categoryIndex] = newCategory

    return Promise.resolve(newCategory)
  }

  function remove(id: string) {
    validate(id)
    categories = categories.filter((category) => category.id !== id)
    return Promise.resolve(id)
  }

  function validate(id: string) {
    if (categories.findIndex((category) => category.id === id) < 0) {
      throw new Error(`No task with the id '${id}'`)
    }
  }

  return {
    create,
    get,
    remove,
    update
  }
})()
