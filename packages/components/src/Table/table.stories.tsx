import type { Meta, StoryObj } from '@storybook/react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { data } from './data'
import { Table, TableProps } from './table'

const meta: Meta<TableProps> = {
  title: 'Table',
  component: Table,
  decorators: [
    (Story) => (
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    )
  ],
  args: {
    data,
    onDrop: (currentData) => {
      console.log('Current rows', currentData)
    },
    onDelete: (id) => {
      console.log(`Delete task id ${id}`)
    },
    onStart: (id) => {
      console.log(`Start task id ${id}`)
    }
  }
}

export default meta

type Story = StoryObj<TableProps>

export const Default: Story = {
  render: ({ ...args }) => <Table {...args} />
}
