import { useMutation, useQuery } from '@tanstack/react-query'
import { Task } from '@timespark/domain/models'
import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTasksDto,
  PauseTaskDto,
  StartTaskDto
} from '@timespark/domain/repositories'
import { port, adapter } from '@timespark/infrastructure'
import { queryClient } from '../context'
import { getPeriodToday } from './misc'

export const taskKeys = {
  all: ['tasks'] as const,
  lists: ({ from, to }: GetTasksDto) => [...taskKeys.all, { from, to }] as const
}

export const useCreateTask = () =>
  useMutation({
    mutationFn: (taskData: CreateTaskDto) =>
      port.taskPort(adapter.taskRepository).createTask(taskData),
    onMutate: (variables) => {
      console.log('createTask payload : ', variables)
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: taskKeys.lists(getPeriodToday())
      })
  })

export const useTasks = ({ from, to }: GetTasksDto) => {
  const { data } = useQuery({
    queryKey: taskKeys.lists({ from, to }),
    queryFn: () => port.taskPort(adapter.taskRepository).getTasks({ from, to })
  })

  return data ?? []
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

export const useStartTask = () =>
  useMutation({
    mutationFn: (taskData: StartTaskDto) =>
      port.taskPort(adapter.taskRepository).startTask(taskData),
    onMutate: (variables) => {
      console.log('startTask payload : ', variables)
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Task[]>(
        taskKeys.lists(getPeriodToday()),
        (prevTasks) =>
          prevTasks?.map((task) =>
            task.id === data.id ? { ...task, ...data } : task
          )
      )
    }
  })

export const setQueryDataForTasks = (taskData: Task | Task[]) => {
  let updater

  if (Array.isArray(taskData)) {
    updater = taskData
  } else {
    const prevData = queryClient.getQueryData<Task[]>(
      taskKeys.lists(getPeriodToday())
    )

    updater = prevData
      ? prevData.map((task) => (task.id === taskData.id ? taskData : task))
      : undefined
  }

  queryClient.setQueryData<Task[]>(taskKeys.lists(getPeriodToday()), updater)
}
