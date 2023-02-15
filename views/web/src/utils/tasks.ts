import { useMutation } from '@tanstack/react-query'
import { CreateTaskDto } from '@timespark/domain/repositories'
import { port, adapter } from '@timespark/infrastructure'

export const useCreateTask = () =>
  useMutation({
    mutationFn: (taskData: CreateTaskDto) =>
      port.taskPort(adapter.taskRepositoryDev).createTask(taskData),
    onMutate: (variables) => {
      console.log('createTask variables: ', variables)
      return { id: 'createTask' }
    },
    onSuccess: (result, variables, context) => {
      console.log('createTask result: ', result)
      console.log('createTask variables: ', variables)
      console.log('createTask context: ', context)
    }
  })
