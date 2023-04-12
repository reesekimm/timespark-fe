import { useEffect, useState } from 'react'
import { CreateTaskDto, DeleteTaskDto, Task } from '@timespark/domain'
import {
  Button,
  Empty,
  Select,
  TaskListContextProvider,
  TaskListDnDBackend,
  TaskList,
  TextInput
} from '@timespark/components'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask
} from '../utils/query-tasks'
import { getPeriodToday } from '../utils/misc'
import { useCategories } from '../utils/query-categories'
import { setSequence } from '../utils/sequence'
import { removeActiveTask, setActiveTask } from '../utils/timerWorker'
import TodaysDate from '../components/TodaysDate'

const schema = z.object({
  categoryId: z.string(),
  title: z.string().min(1).max(30),
  estimatedDuration: z.number()
})

function Home() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
    control
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  })

  const categories = useCategories()

  const createTask = useCreateTask()
  const {
    data: { tasks, activeTask }
  } = useTasks(getPeriodToday())
  const { mutate: deleteTask } = useDeleteTask()
  const {
    mutate: update,
    data: updatedTask,
    isSuccess: updateSuccess,
    reset: resetUpdateState
  } = useUpdateTask()

  const [activeId, setActiveId] = useState('')

  // Disable inactive tasks after routing
  useEffect(() => {
    setActiveId(activeTask?.id ?? '')
  }, [activeTask])

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

  const onStart = (id: string) => {
    const task = tasks?.find((task) => task.id === id)
    if (!task) return

    update({
      id,
      state: task.state === 'created' ? 'start' : 'continue',
      time: new Date().toISOString()
    })
  }

  const onPause = (id: string) => {
    update({
      id,
      state: 'pause',
      time: new Date().toISOString()
    })
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
      const state = updatedTask.state

      if (state === 'start' || state === 'continue') {
        setActiveTask(updatedTask)
        setActiveId(updatedTask.id)
      }

      if (state === 'pause' || state === 'complete') {
        removeActiveTask()
        setActiveId('')
      }

      resetUpdateState()
    }
  }, [resetUpdateState, updateSuccess, tasks, updatedTask])

  const onDrop = (tasks: Omit<Task, 'categoryId'>[]) => {
    setSequence(tasks.map((task) => task.id))
  }

  const setCategory = (tasks: Task[]) => {
    return tasks.map((task) => ({
      ...task,
      category: categories.find((c) => c.id === task.categoryId) ?? {
        id: '',
        name: 'None',
        color: '#795bff'
      }
    }))
  }

  return (
    <>
      <TodaysDate style={{ marginBottom: '4rem' }} />
      <Form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '6rem' }}>
        <Select
          {...register('categoryId')}
          label='Category'
          placeholder='None'
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
          style={{ minWidth: '20rem' }}
        />
        <Controller
          control={control}
          name='title'
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value ? value.slice(0, 30) : ''}
              label='Task'
              placeholder="Let's dive in!"
              onChange={(e) => onChange(e.target.value.slice(0, 30))}
              maxLength={30}
              style={{ minWidth: '68rem' }}
            />
          )}
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
            data={setCategory(tasks)}
            onDrop={onDrop}
            onDelete={(id) => onDelete({ id })}
            onStart={onStart}
            onPause={onPause}
            onComplete={onComplete}
            activeTaskId={activeId}
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
