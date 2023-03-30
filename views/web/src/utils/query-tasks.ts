import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CreateTaskDto,
  DeleteTaskDto,
  GetTasksDto,
  Task,
  UpdateTaskDto
} from '@timespark/domain'
import { taskClient } from '@timespark/infrastructure'
import { useEffect, useState } from 'react'
import { queryClient } from '../context'
import { getPeriodToday } from './misc'
import { getSequence, setSequence } from './sequence'
import { getActiveTask } from './timerWorker'

export const taskKeys = {
  all: ['tasks'] as const,
  lists: ({ from, to }: GetTasksDto) => [...taskKeys.all, { from, to }] as const
}

let activeTask: Task | null = null

export const useCreateTask = () =>
  useMutation({
    mutationFn: (taskData: CreateTaskDto) => taskClient.createTask(taskData),
    onSuccess: (data) => {
      setSequence(getSequence().concat(data.id))
      queryClient.invalidateQueries(taskKeys.lists(getPeriodToday()))
    }
  })

export const useTasks = ({ from, to }: GetTasksDto) => {
  const queryResult = useQuery({
    queryKey: taskKeys.lists({ from, to }),
    queryFn: () => taskClient.getTasks({ from, to })
  })

  const [result, setResult] = useState<Task[]>([])

  useEffect(() => {
    const data = queryResult.data

    if (!data) return

    getActiveTask()

    let tempResult: Task[] = []

    const sequence = getSequence()
    const validSequence = data.every((task) => sequence.includes(task.id))

    if (validSequence) {
      for (const id of sequence) {
        const matchTask = data.find((task) => task.id === id)
        if (matchTask) tempResult.push(matchTask)
      }
    } else {
      tempResult = data
    }

    if (activeTask) {
      tempResult = tempResult.map((task) =>
        task.id === activeTask?.id ? activeTask : task
      )
    }

    setResult(tempResult)
    setSequence(tempResult.map((task) => task.id))
  }, [queryResult.data])

  return { ...queryResult, data: { tasks: result, activeTask } }
}

export const useDeleteTask = () =>
  useMutation({
    mutationFn: ({ id }: DeleteTaskDto) => taskClient.deleteTask({ id }),
    onSuccess: ({ id }) => {
      setSequence(getSequence().filter((taskId) => taskId !== id))
      queryClient.invalidateQueries(taskKeys.lists(getPeriodToday()))
    }
  })

export const useUpdateTask = () =>
  useMutation({
    mutationFn: (taskData: UpdateTaskDto) => taskClient.updateTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries(taskKeys.lists(getPeriodToday()))
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

export const setActiveTask = (task: Task | null) => {
  activeTask = task
}
