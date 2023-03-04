import { Button, TextInput } from '@timespark/components'
import { Category } from '@timespark/domain/models'
import { CreateCategoryDto } from '@timespark/domain/repositories'
import { ChangeEvent, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

type Common = {
  state: 'collapsed' | 'expanded'
}

type CreateMode = Common & {
  onCancel: () => void
  onCreate: ({ name }: CreateCategoryDto) => void
}

type EditMode = Common & {
  category: Category
  onUpdate: () => void
  onDelete: () => void
}

type CategoryEditorProps = CreateMode | EditMode

function CategoryEditor(props: CategoryEditorProps) {
  const [collapsed, setCollapsed] = useState(props.state === 'collapsed')
  const [categoryPreview, setCategoryPreview] = useState(
    'category' in props ? props.category.name : 'Category Preview'
  )

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: 'category' in props ? props.category.name : '' }
  })

  const { onChange } = register('name')

  const { submitButtonLabel, onSubmit, onCancel } = useMemo(() => {
    if ('category' in props) {
      return {
        submitButtonLabel: 'Save',
        onSubmit: (data) => {
          props.onUpdate(data)
          setCollapsed(true)
        },
        onCancel: () => {
          reset({ name: props.category.name })
          setCategoryPreview(props.category.name)
          setCollapsed(true)
        }
      }
    } else {
      return {
        submitButtonLabel: 'Create',
        onSubmit: ({ name }) => {
          props.onCreate({ name })
          reset({ name: '' })
          setCategoryPreview('Category preview')
        },
        onCancel: () => props.onCancel()
      }
    }
  }, [props, reset])

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    setCategoryPreview(e.target.value ? e.target.value : 'Category Preview')
  }

  return (
    <div>
      <PreviewWrapper>
        <Preview>{categoryPreview}</Preview>
        <ButtonWrapper>
          {collapsed ? (
            <Button
              variant='text'
              size='small'
              onClick={() => setCollapsed(false)}
            >
              Edit
            </Button>
          ) : null}
          {'category' in props ? (
            <Button variant='text' size='small'>
              Delete
            </Button>
          ) : null}
        </ButtonWrapper>
      </PreviewWrapper>
      {collapsed ? null : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register('name')}
            label='Category name'
            onChange={onChangeName}
            inputSize='small'
            style={{ flex: 1 }}
          />
          <Button
            label='Cancel'
            size='small'
            onClick={onCancel}
            type='button'
          />
          <Button
            label={submitButtonLabel}
            size='small'
            variant='primary'
            type='submit'
          />
        </Form>
      )}
    </div>
  )
}

export default CategoryEditor

const PreviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Preview = styled.div`
  padding: 1rem;
  border: ${({ theme }) => `2px solid ${theme.palette.secondary}`};
`

const ButtonWrapper = styled.div`
  display: flex;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-top: 2rem;

  button {
    margin-left: 1.3rem;
  }
`
