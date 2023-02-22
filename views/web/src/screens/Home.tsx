import {
  Button,
  Empty,
  Select,
  Table,
  TableContextProvider,
  TableDnDBackend,
  TextInput
} from '@timespark/components'
import { CreateTaskDto } from '@timespark/domain/repositories'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTask, useTasks } from '../utils/query-tasks'
import { getPeriodToday } from '../utils/misc'

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

  const createTask = useCreateTask(getPeriodToday())
  const tasks = useTasks(getPeriodToday())

  const onSubmit = (data: CreateTaskDto) => {
    createTask.mutate(data)
    reset({ categoryId: '1', title: '', estimatedDuration: 10 })
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '6rem' }}>
        <Select
          {...register('categoryId')}
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
      {tasks ? (
        <TableContextProvider backend={TableDnDBackend}>
          <Table
            aria-label='tasks'
            data={tasks.map((task) => ({
              ...task,
              category:
                categories.find((c) => c.value === task.categoryId)?.label ??
                'None'
            }))}
            onDrop={(currentData) => console.log(currentData)}
          />
        </TableContextProvider>
      ) : (
        <Empty description='Add your first task :)' />
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
