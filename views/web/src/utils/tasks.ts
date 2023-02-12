import { useQuery } from '@tanstack/react-query'
import { port, adapter } from '@timespark/infrastructure'

export const useTasks = () =>
  useQuery({
    queryKey: ['tasks'],
    queryFn: port.taskPort(adapter.taskRepositoryDev).getTasks
  })
