import { useEffect } from 'react'
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
  useTasks,
  useUpdateTask
} from '../utils/query-tasks'
import { getPeriodToday, useLocalStorageState } from '../utils/misc'
import { Task } from '@timespark/domain/models'
import { useCategories } from '../utils/query-categories'

const schema = z.object({
  categoryId: z.string(),
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

  const categories = useCategories()

  const [activeTask, setActiveTask] = useLocalStorageState('activeTask', null)
  const [timerId, setTimerId] = useLocalStorageState('timerId', 0)

  const createTask = useCreateTask()
  const tasks = useTasks(getPeriodToday())
  const {
    mutate: deleteTask,
    isSuccess: deleteSuccess,
    reset: resetDeleteState
  } = useDeleteTask()
  const {
    mutate: update,
    isSuccess: updateSuccess,
    reset: resetUpdateState
  } = useUpdateTask()

  const onSubmit = (data: CreateTaskDto) => {
    createTask.mutate({
      ...data,
      categoryId: categories.find((c) => c.id === data.categoryId)?.id ?? '',
      estimatedDuration: data.estimatedDuration * 60
    })
    reset({ categoryId: '', title: '', estimatedDuration: 10 })
  }

  const onDelete = ({ id }: DeleteTaskDto) => {
    deleteTask({ id })
  }

  useEffect(() => {
    if (deleteSuccess) {
      setActiveTask(null)
      resetDeleteState()
    }
  }, [deleteSuccess, resetDeleteState, setActiveTask])

  const onStart = (id: string) => {
    const task = tasks?.find((task) => task.id === id)
    if (!task) return

    setActiveTask(task)
    update({
      id,
      state: task.state === 'created' ? 'start' : 'continue',
      time: new Date().toISOString()
    })
  }

  const onPause = (id: string) => {
    if (activeTask?.id === id) {
      update({
        id,
        state: 'pause',
        time: new Date().toISOString()
      })
    }
  }

  const onComplete = (id: string) => {
    update({
      id,
      state: 'complete',
      time: new Date().toISOString()
    })
  }

  useEffect(() => {
    if (updateSuccess) {
      const task = tasks.find((task) => task.id === activeTask?.id)
      if (!task) return

      if (task.state === 'start' || task.state === 'continue') {
        let time = task.actualDuration

        const id = setInterval(() => {
          const updatedTask = {
            ...task,
            actualDuration: time + 1
          }
          setQueryDataForTasks(updatedTask)
          setActiveTask(updatedTask)
          time += 1
        }, 1000)

        setTimerId(id)
      }

      if (task.state === 'pause') {
        clearInterval(timerId)
        setTimerId(0)
        setActiveTask(null)
      }

      resetUpdateState()
    }
  }, [
    activeTask,
    setActiveTask,
    resetUpdateState,
    updateSuccess,
    tasks,
    setTimerId,
    timerId
  ])

  const onDrop = (tasks: Task[]) => {
    setQueryDataForTasks(tasks)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '6rem' }}>
        <Select
          {...register('categoryId')}
          label='Category'
          placeholder='None'
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
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
              categoryName:
                categories.find((c) => c.id === task.categoryId)?.name ?? 'None'
            }))}
            onDrop={onDrop}
            onDelete={(id) => onDelete({ id })}
            onStart={onStart}
            onPause={onPause}
            onComplete={onComplete}
            activeTaskId={activeTask?.id ?? ''}
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
