import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateTaskDto, GetTasksDto } from '@timespark/domain/repositories'
import { port, adapter } from '@timespark/infrastructure'
import { queryClient } from '../context'

export const taskKeys = {
  all: ['tasks'] as const,
  lists: ({ from, to }: GetTasksDto) => [...taskKeys.all, { from, to }] as const
}

export const useCreateTask = (period: GetTasksDto) =>
  useMutation({
    mutationFn: (taskData: CreateTaskDto) =>
      port.taskPort(adapter.taskRepository).createTask(taskData),
    onMutate: (variables) => {
      console.log('createTask payload : ', variables)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: taskKeys.lists(period) })
  })

export const useTasks = ({ from, to }: GetTasksDto) => {
  const { data } = useQuery({
    queryKey: taskKeys.lists({ from, to }),
    queryFn: () => port.taskPort(adapter.taskRepository).getTasks({ from, to })
  })

  return data && data.length > 0 ? [...data].reverse() : null
}
