import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Tag, TextInput } from '@timespark/components'
import { Category } from '@timespark/domain/models'
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain/repositories'
import { ChangeEvent, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { z } from 'zod'

type Common = {
  state: 'collapsed' | 'expanded'
}

type CreateMode = Common & {
  onCancel: () => void
  onCreate: (categoryData: CreateCategoryDto) => void
}

type EditMode = Common & {
  category: Category
  onUpdate: (categoryData: UpdateCategoryDto) => void
  onDelete: ({ id }: DeleteCategoryDto) => void
}

type CategoryEditorProps = CreateMode | EditMode

const schema = z
  .object({
    name: z.string().min(1).max(20),
    color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
  })
  .required()

function CategoryEditor(props: CategoryEditorProps) {
  const [collapsed, setCollapsed] = useState(props.state === 'collapsed')
  const [categoryPreview, setCategoryPreview] = useState({
    name: 'category' in props ? props.category.name : 'Category Preview',
    color: 'category' in props ? props.category.color : '#ADB6BF'
  })

  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'category' in props ? props.category.name : '',
      color: 'category' in props ? props.category.color : '#ADB6BF'
    }
  })

  const { submitButtonLabel, onSubmit, onCancel } = useMemo(() => {
    if ('category' in props) {
      return {
        submitButtonLabel: 'Save',
        onSubmit: (data: Omit<UpdateCategoryDto, 'id'>) => {
          props.onUpdate({ id: props.category.id, ...data })
          setCollapsed(true)
        },
        onCancel: () => {
          setCategoryPreview({ ...categoryPreview, name: props.category.name })
          setCollapsed(true)
        }
      }
    } else {
      return {
        submitButtonLabel: 'Create',
        onSubmit: (data: CreateCategoryDto) => {
          console.log('[data]', data)
          props.onCreate(data)
          setCategoryPreview({
            ...categoryPreview,
            name: 'Category preview',
            color: '#ADB6BF'
          })
        },
        onCancel: () => props.onCancel()
      }
    }
  }, [categoryPreview, props])

  const { onChange: onChangeName } = register('name')
  const { onChange: onChangeColor } = register('color')

  const onChangeNameField = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeName(e)
    setCategoryPreview({
      ...categoryPreview,
      name: e.target.value ? e.target.value : 'Category Preview'
    })
  }

  const onChangeColorField = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeColor(e)
    setCategoryPreview({
      ...categoryPreview,
      color: e.target.value
    })
  }

  return (
    <div>
      <PreviewWrapper>
        <Tag value={categoryPreview.name} color={categoryPreview.color} />
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
            <Button
              variant='text'
              size='small'
              onClick={() => props.onDelete({ id: props.category.id })}
            >
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
            onChange={onChangeNameField}
            inputSize='small'
            style={{ flex: 1, marginRight: '1.3rem' }}
          />
          <TextInput
            {...register('color')}
            label='Color'
            onChange={onChangeColorField}
            inputSize='small'
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
            disabled={!isValid}
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
