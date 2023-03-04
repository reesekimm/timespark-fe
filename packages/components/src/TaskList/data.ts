import { Task } from './task-list'

export const data: Task[] = [
  {
    id: '0fef1e51-ecea-4778-9337-a322c0f3a373',
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'created',
    categoryId: 'c685bce6-2ac6-418b-bcaa-cbe148e0eb0b',
    categoryName: 'Category',
    tags: [],
    title: 'task1 (created)',
    estimatedDuration: 10 * 60,
    actualDuration: 0
  },
  {
    id: '892f5bcf-3c48-4cc7-8d0e-3d92e7d8907a',
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'start',
    categoryId: '4823dd18-62d2-4276-b491-f73bad958898',
    categoryName: 'Category',
    tags: [],
    title: 'task2 (start)',
    estimatedDuration: 10 * 60,
    actualDuration: 2 * 60
  },
  {
    id: '97412a90-86d0-4c3b-b057-ae75ba1f1dea',
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'pause',
    categoryId: '3c8c5bcf-4361-421b-9328-ef318067750a',
    categoryName: 'Category',
    tags: [],
    title: 'task3 (pause)',
    estimatedDuration: 10 * 60,
    actualDuration: 5 * 60
  },
  {
    id: 'b47a196e-5d65-44f8-9ec1-7d0f4199945f',
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'continue',
    categoryId: '68eb14e1-7fdc-44e7-8a39-0dfc8eabd4a5',
    categoryName: 'Category',
    tags: [],
    title: 'task4 (continue)',
    estimatedDuration: 10 * 60,
    actualDuration: 6 * 60
  },
  {
    id: '697afed7-b57d-4ed7-a5a5-e09096bc26d5',
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'continue',
    categoryId: '8fc15534-55ad-43f1-ab40-c753d5298a91',
    categoryName: 'Category',
    tags: [],
    title: 'task5 (continue - almost reached the estimated time)',
    estimatedDuration: 10 * 60,
    actualDuration: 8 * 60
  },
  {
    id: '949aa660-9b8a-461c-89da-5acb89b3de6b',
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'complete',
    categoryId: 'e969c905-4815-49a0-b13f-c18559699536',
    categoryName: 'Category',
    tags: [],
    title: 'task6 (end)',
    estimatedDuration: 10 * 60,
    actualDuration: 9 * 60
  },
  {
    id: '15346eef-1ed9-496e-b77f-05adaf3d0229',
    createdTime: '',
    startTime: '',
    endTime: '',
    state: 'continue',
    categoryId: '92134bdc-fc6a-483b-b343-f8d6179719c4',
    categoryName: 'Category',
    tags: [],
    title: 'task7 (time over)',
    estimatedDuration: 10 * 60,
    actualDuration: 15 * 60
  }
]
