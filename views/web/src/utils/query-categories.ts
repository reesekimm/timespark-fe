import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain/repositories'
import { adapter, port } from '@timespark/infrastructure'
import { queryClient } from '../context'

export const categoryKeys = {
  all: ['categories'] as const
}

export const useCreateCategory = () =>
  useMutation({
    mutationFn: (categoryData: CreateCategoryDto) =>
      port
        .categoryPort(adapter.categoryRepository)
        .createCategory(categoryData),
    onSuccess: () => queryClient.invalidateQueries(categoryKeys.all)
  })

export const useCategories = () => {
  const { data } = useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => port.categoryPort(adapter.categoryRepository).getCategories()
  })

  return data ?? []
}

export const useUpdateCategory = () =>
  useMutation({
    mutationFn: (categoryData: UpdateCategoryDto) =>
      port
        .categoryPort(adapter.categoryRepository)
        .updateCategory(categoryData),
    onSuccess: () => queryClient.invalidateQueries(categoryKeys.all)
  })

export const useDeleteCategory = () =>
  useMutation({
    mutationFn: ({ id }: DeleteCategoryDto) =>
      port.categoryPort(adapter.categoryRepository).deleteCategory({ id }),
    onSuccess: () => queryClient.invalidateQueries(categoryKeys.all)
  })
