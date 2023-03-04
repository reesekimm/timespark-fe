import { Button } from '@timespark/components'
import { useState } from 'react'
import styled from 'styled-components'
import CategoryEditor from '../components/CategoryEditor'
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory
} from '../utils/query-categories'

function Settings() {
  const [showing, setShowing] = useState(false)

  const categories = useCategories()
  const { mutate: create } = useCreateCategory()
  const { mutate: update } = useUpdateCategory()
  const { mutate: deleteCategory } = useDeleteCategory()

  const toggleVisibility = () => {
    setShowing((prev) => !prev)
  }

  return (
    <section>
      <SectionHead>
        <h3>Categories</h3>
        <Button variant='primary' onClick={toggleVisibility}>
          New category
        </Button>
      </SectionHead>
      {showing ? (
        <CategoryEditorWrapper>
          <CategoryEditor
            state='expanded'
            onCancel={toggleVisibility}
            onCreate={(data) => {
              create(data)
              toggleVisibility()
            }}
          />
        </CategoryEditorWrapper>
      ) : null}
      <ListHead>{categories.length} categories</ListHead>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>
            <CategoryEditor
              state='collapsed'
              category={category}
              onUpdate={update}
              onDelete={deleteCategory}
            />
          </ListItem>
        ))}
      </List>
    </section>
  )
}

export default Settings

const SectionHead = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: ${({ theme }) => theme.fontSize.medium};
    font-family: ${({ theme }) => theme.fontFamily.extraBold};
  }
`

const CategoryEditorWrapper = styled.div`
  background-color: RGBA(234, 237, 239, 0.5);
  border: ${({ theme }) => `1px solid ${theme.palette.gray[400]}`};
  border-radius: 10px;
  padding: 1.6rem;
  margin-bottom: 2rem;

  input {
    background: transparent;
  }
`

const ListHead = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: RGBA(234, 237, 239, 0.5);
  border: ${({ theme }) => `1px solid ${theme.palette.gray[400]}`};
  border-bottom: none;
  padding: 1.6rem;
  font-family: ${({ theme }) => theme.fontFamily.extraBold};
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: ${({ theme }) => `1px solid ${theme.palette.gray[400]}`};
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

const ListItem = styled.li`
  padding: 1.6rem;
  border-top: ${({ theme }) => `1px solid ${theme.palette.gray[400]}`};
`
