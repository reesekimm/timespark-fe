import { Button, Select, TextInput } from '@timespark/components'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

function Home() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: unknown) => {
    alert(JSON.stringify(data))
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Select
        {...register('category')}
        label='Category'
        options={categories}
        style={{ minWidth: '20rem' }}
      />
      <TextInput
        {...register('task')}
        label='Task'
        placeholder="Let's dive in!"
        style={{ minWidth: '68rem' }}
      />
      <Select
        {...register('estimated_time')}
        label='Estimated Time (min)'
        options={times}
        style={{ minWidth: '15rem' }}
      />
      <Button variant='primary' label='Add' style={{ width: '10rem' }} />
    </Form>
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
  { value: '', label: 'None' },
  { value: 'workout', label: '운동' },
  { value: 'meditation', label: '명상' },
  { value: 'study', label: '공부' }
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
