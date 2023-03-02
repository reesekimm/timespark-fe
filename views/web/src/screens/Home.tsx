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
  usePauseTask,
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

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const createTask = useCreateTask()
  const tasks = useTasks(getPeriodToday())
  const {
    mutate: deleteTask,
    isSuccess: deleteSuccess,
    reset: resetDeleteState
  } = useDeleteTask()
  const {
    mutate: start,
    isSuccess: startSuccess,
    reset: resetStartState
  } = useStartTask()
  const {
    mutate: pause,
    isSuccess: pauseSuccess,
    reset: resetPauseState
  } = usePauseTask()

  const timerId = useRef<number>()

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
    deleteTask({ id })
  }

  useEffect(() => {
    if (deleteSuccess) {
      setActiveTask(null)
      resetDeleteState()
    }
  }, [deleteSuccess, resetDeleteState])

  const onStart = (id: number) => {
    const task = tasks?.find((task) => task.id === id)
    if (!task) return

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
        const updatedTask = {
          ...task,
          actualDuration: time + 1
        }
        setQueryDataForTasks(updatedTask)
        setActiveTask(updatedTask)
        time += 1
      }, 1000)

      resetStartState()
    }
  }, [activeTask, resetStartState, startSuccess, tasks])

  const onPause = (id: number) => {
    if (!activeTask || activeTask.id !== id) return
    pause({ id: activeTask.id, actualDuration: activeTask.actualDuration })
  }

  useEffect(() => {
    if (pauseSuccess) {
      setActiveTask(null)
      clearInterval(timerId.current)
      resetPauseState()
    }
  }, [pauseSuccess, resetPauseState])

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
            onPause={onPause}
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
