import { useMutation } from '@tanstack/react-query'
import { CreateTaskDto } from '@timespark/domain/repositories'
import { port, adapter } from '@timespark/infrastructure'

export const useCreateTask = () =>
  useMutation({
    mutationFn: (taskData: CreateTaskDto) =>
      port.taskPort(adapter.taskRepositoryDev).createTask(taskData),
    onMutate: (variables) => {
      console.log('createTask payload : ', variables)
    }
  })
