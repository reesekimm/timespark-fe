import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateCategoryDto } from '@timespark/domain/repositories'
import { adapter, port } from '@timespark/infrastructure'
import { queryClient } from '../context'

export const categoryKeys = {
  all: ['categories'] as const
}

export const useCreateCategory = () =>
  useMutation({
    mutationFn: ({ name }: CreateCategoryDto) =>
      port.categoryPort(adapter.categoryRepository).createCategory({ name }),
    onSuccess: () => queryClient.invalidateQueries(categoryKeys.all)
  })

export const useCategories = () => {
  const { data } = useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => port.categoryPort(adapter.categoryRepository).getCategories()
  })

  return data ?? []
}
