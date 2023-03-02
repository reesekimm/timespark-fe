import { Task } from './task-list'

export const data: Task[] = [
  {
    id: 1,
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'created',
    categoryName: 'Category',
    tags: [],
    title: 'task1 (created)',
    estimatedDuration: 10 * 60,
    actualDuration: 0
  },
  {
    id: 2,
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'start',
    categoryName: 'Category',
    tags: [],
    title: 'task2 (start)',
    estimatedDuration: 10 * 60,
    actualDuration: 2 * 60
  },
  {
    id: 3,
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'pause',
    categoryName: 'Category',
    tags: [],
    title: 'task3 (pause)',
    estimatedDuration: 10 * 60,
    actualDuration: 5 * 60
  },
  {
    id: 4,
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'continue',
    categoryName: 'Category',
    tags: [],
    title: 'task4 (continue)',
    estimatedDuration: 10 * 60,
    actualDuration: 6 * 60
  },
  {
    id: 5,
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'continue',
    categoryName: 'Category',
    tags: [],
    title: 'task5 (continue - almost reached the estimated time)',
    estimatedDuration: 10 * 60,
    actualDuration: 8 * 60
  },
  {
    id: 6,
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'end',
    categoryName: 'Category',
    tags: [],
    title: 'task6 (end)',
    estimatedDuration: 10 * 60,
    actualDuration: 9 * 60
  },
  {
    id: 7,
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'continue',
    categoryName: 'Category',
    tags: [],
    title: 'task7 (time over)',
    estimatedDuration: 10 * 60,
    actualDuration: 15 * 60
  }
]
