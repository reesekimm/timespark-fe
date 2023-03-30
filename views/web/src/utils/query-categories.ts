import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain'
import { categoryClient } from '@timespark/infrastructure'
import { queryClient } from '../context'

export const categoryKeys = {
  all: ['categories'] as const
}

export const useCreateCategory = () =>
  useMutation({
    mutationFn: (categoryData: CreateCategoryDto) =>
      categoryClient.createCategory(categoryData),
    onSuccess: () => queryClient.invalidateQueries(categoryKeys.all)
  })

export const useCategories = () => {
  const { data } = useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => categoryClient.getCategories()
  })

  return data ?? []
}

export const useUpdateCategory = () =>
  useMutation({
    mutationFn: (categoryData: UpdateCategoryDto) =>
      categoryClient.updateCategory(categoryData),
    onSuccess: () => queryClient.invalidateQueries(categoryKeys.all)
  })

export const useDeleteCategory = () =>
  useMutation({
    mutationFn: ({ id }: DeleteCategoryDto) =>
      categoryClient.deleteCategory({ id }),
    onSuccess: () => queryClient.invalidateQueries(categoryKeys.all)
  })
