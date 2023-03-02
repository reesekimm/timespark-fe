import {
  Button,
  Empty,
  Select,
  TaskListContextProvider,
  TaskListDnDBackend,
  TaskList,
  TextInput
} from '@timespark/components'
import { CreateTaskDto, DeleteTaskDto } from '@timespark/domain/repositories'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  setQueryDataForTasks,
  useCreateTask,
  useDeleteTask,
  useStartTask,
  useTasks
} from '../utils/query-tasks'
import { getPeriodToday } from '../utils/misc'
import { useEffect, useRef, useState } from 'react'
import { Task } from '@timespark/domain/models'

const schema = z.object({
  categoryName: z.string(),
  title: z.string().min(1),
  estimatedDuration: z.number()
})

function Home() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  })

  const [activeTask, setActiveTask] = useState<Task>()

  const createTask = useCreateTask()
  const tasks = useTasks(getPeriodToday())
  const deleteTask = useDeleteTask()
  const {
    mutate: start,
    isSuccess: startSuccess,
    reset: resetStartState
  } = useStartTask()

  const timerId = useRef<number>(0)

  const onSubmit = (data: CreateTaskDto) => {
    createTask.mutate({
      ...data,
      categoryName:
        categories.find((c) => c.value === data.categoryName)?.label ?? 'None',
      estimatedDuration: data.estimatedDuration * 60
    })
    reset({ categoryName: '1', title: '', estimatedDuration: 10 })
  }

  const onDelete = ({ id }: DeleteTaskDto) => {
    deleteTask.mutate({ id })
  }

  const onStart = (id: number) => {
    const task = tasks?.find((task) => task.id === id)
    setActiveTask(task)
    start({
      id,
      startTime: new Date().toISOString()
    })
  }

  const onDrop = (tasks: Task[]) => {
    setQueryDataForTasks(tasks)
  }

  useEffect(() => {
    if (startSuccess) {
      const task = tasks.find((task) => task.id === activeTask?.id)
      if (!task) return

      let time = task.actualDuration

      timerId.current = setInterval(() => {
        setQueryDataForTasks({ ...task, actualDuration: time + 1 })
        time += 1
      }, 1000)

      // 타이머가 한 번만 실행되도록 상태 초기화
      resetStartState()
    }
  }, [activeTask, resetStartState, startSuccess, tasks])

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '6rem' }}>
        <Select
          {...register('categoryName')}
          label='Category'
          options={categories}
          style={{ minWidth: '20rem' }}
        />
        <TextInput
          {...register('title')}
          label='Task'
          placeholder="Let's dive in!"
          style={{ minWidth: '68rem' }}
        />
        <Select
          {...register('estimatedDuration', { valueAsNumber: true })}
          label='Estimated Dur. (min)'
          options={times}
          style={{ minWidth: '15rem' }}
        />
        <Button
          variant='primary'
          label='Add'
          disabled={!isValid}
          loading={createTask.isLoading}
          style={{ width: '10rem' }}
        />
      </Form>
      {tasks.length > 0 ? (
        <TaskListContextProvider backend={TaskListDnDBackend}>
          <TaskList
            aria-label='tasks'
            data={tasks.map((task) => ({
              ...task,
              category:
                categories.find((c) => c.label === task.categoryName)?.label ??
                'None'
            }))}
            onDrop={(tasks) => onDrop(tasks)}
            onDelete={(id) => onDelete({ id })}
            onStart={onStart}
            activeTaskId={activeTask?.id ?? 0}
          />
        </TaskListContextProvider>
      ) : (
        <Empty
          description='Add your first task :)'
          style={{ padding: '25rem' }}
        />
      )}
    </>
  )
}

export default Home

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const categories = [
  { value: '1', label: 'None' },
  { value: '2', label: '운동' },
  { value: '3', label: '명상' },
  { value: '4', label: '공부' }
]

const times = [
  {
    value: 10,
    label: 10
  },
  {
    value: 15,
    label: 15
  },
  {
    value: 20,
    label: 20
  },
  {
    value: 25,
    label: 25
  },
  {
    value: 30,
    label: 30
  },
  {
    value: 35,
    label: 35
  },
  {
    value: 40,
    label: 40
  },
  {
    value: 45,
    label: 45
  },
  {
    value: 50,
    label: 50
  },
  {
    value: 55,
    label: 55
  },
  {
    value: 60,
    label: 60
  }
]
