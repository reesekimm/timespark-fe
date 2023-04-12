import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Tag, TextInput } from '@timespark/components'
import {
  Category,
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto
} from '@timespark/domain'
import { Icons } from '@timespark/styles'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { z } from 'zod'
import { generateRandomColorCode } from '../utils/misc'

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
    name: z.string().min(1).max(15),
    color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
  })
  .required()

function CategoryEditor(props: CategoryEditorProps) {
  const [collapsed, setCollapsed] = useState(props.state === 'collapsed')
  const [categoryPreview, setCategoryPreview] = useState({
    name: 'category' in props ? props.category.name : 'Category Preview',
    color: 'category' in props ? props.category.color : '#795bff'
  })

  const {
    handleSubmit,
    formState: { isValid },
    setValue,
    control
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'category' in props ? props.category.name : '',
      color: 'category' in props ? props.category.color : '#795bff'
    }
  })

  const { submitButtonLabel, onSubmit, onCancel } = useMemo(() => {
    if ('category' in props) {
      return {
        submitButtonLabel: 'Save',
        onSubmit: (data: Omit<UpdateCategoryDto, 'id'>) => {
          props.onUpdate({
            id: props.category.id,
            ...data,
            name: data.name.slice(0, 15)
          })
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
          props.onCreate(data)
          setCategoryPreview({
            ...categoryPreview,
            name: 'Category preview',
            color: '#795bff'
          })
        },
        onCancel: () => props.onCancel()
      }
    }
  }, [categoryPreview, props])

  const generateColor = () => {
    const color = generateRandomColorCode()
    setCategoryPreview({ ...categoryPreview, color })
    setValue('color', color)
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
          <Controller
            control={control}
            name='name'
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value ? value.slice(0, 15) : ''}
                label='Category name'
                onChange={(e) => {
                  onChange(e.target.value.slice(0, 15))
                  setCategoryPreview({
                    ...categoryPreview,
                    name: e.target.value
                      ? e.target.value.slice(0, 15)
                      : 'Category Preview'
                  })
                }}
                inputSize='small'
                maxLength={15}
                style={{ flex: 1, marginRight: '1.3rem' }}
              />
            )}
          />
          <Field>
            <Controller
              control={control}
              name='color'
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value ?? ''}
                  label='Color'
                  onChange={(e) => {
                    onChange(e)
                    setCategoryPreview({
                      ...categoryPreview,
                      color: e.target.value
                    })
                  }}
                  inputSize='small'
                />
              )}
            />
            <RandomColorGenButton
              type='button'
              color={categoryPreview.color}
              onClick={generateColor}
            >
              <Icons.GrUpdate />
            </RandomColorGenButton>
          </Field>
          <SubmitButtonWrapper>
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
          </SubmitButtonWrapper>
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

const Field = styled.fieldset`
  border: none;
  display: flex;
  align-items: flex-end;
  padding: 0;
`

const RandomColorGenButton = styled.button`
  padding: 1rem;
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  path {
    stroke: ${({ theme }) => theme.palette.white};
  }
`

const SubmitButtonWrapper = styled.div`
  display: flex;
  margin-left: 30rem;
`
