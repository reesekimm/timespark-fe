import { useMutation, useQuery } from '@tanstack/react-query'
import { Task } from '@timespark/domain/models'
import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTasksDto,
  UpdateTaskDto
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
    onSuccess: (data) => {
      queryClient.setQueryData<Task[]>(
        taskKeys.lists(getPeriodToday()),
        (prevTasks) => (prevTasks ? [...prevTasks, data] : [data])
      )
    }
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
    onSuccess: ({ id }) => {
      queryClient.setQueryData<Task[]>(
        taskKeys.lists(getPeriodToday()),
        (prevTasks) =>
          prevTasks ? prevTasks.filter((task) => task.id !== id) : prevTasks
      )
    }
  })

export const useUpdateTask = () =>
  useMutation({
    mutationFn: (taskData: UpdateTaskDto) =>
      port.taskPort(adapter.taskRepository).updateTask(taskData),
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
