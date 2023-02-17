import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateTaskDto, GetTasksDto } from '@timespark/domain/repositories'
import { port, adapter } from '@timespark/infrastructure'
import { queryClient } from '../context'
import { taskKeys } from './query-keys'

export const useCreateTask = (period: GetTasksDto) =>
  useMutation({
    mutationFn: (taskData: CreateTaskDto) =>
      port.taskPort(adapter.taskRepositoryDev).createTask(taskData),
    onMutate: (variables) => {
      console.log('createTask payload : ', variables)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: taskKeys.lists(period) })
  })

export const useTasks = (period: GetTasksDto) => {
  const { data } = useQuery({
    queryKey: taskKeys.lists(period),
    queryFn: () => port.taskPort(adapter.taskRepositoryDev).getTasks(period)
  })
  return data && data.length > 0 ? data : null
}
