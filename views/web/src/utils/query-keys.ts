import { GetTasksDto } from '@timespark/domain/repositories'

export const taskKeys = {
  all: ['tasks'] as const,
  lists: ({ from, to }: GetTasksDto) => [...taskKeys.all, { from, to }] as const
}
