import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTasksDto,
  StartTaskDto
} from '@timespark/domain/repositories'
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

export const useDeleteTask = () =>
  useMutation({
    mutationFn: ({ id }: DeleteTaskDto) =>
      port.taskPort(adapter.taskRepository).deleteTask({ id }),
    onMutate: (variables) => {
      console.log('deleteTask payload : ', variables)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all })
  })

export const useStartTask = (period: GetTasksDto) =>
  useMutation({
    mutationFn: (taskData: StartTaskDto) =>
      port.taskPort(adapter.taskRepository).startTask(taskData),
    onMutate: (variables) => {
      console.log('deleteTask payload : ', variables)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: taskKeys.lists(period) })
  })
