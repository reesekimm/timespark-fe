import type { Meta, StoryObj } from '@storybook/react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { data } from './data'
import { TaskList, TaskListProps } from './task-list'

const meta: Meta<TaskListProps> = {
  title: 'TaskList',
  component: TaskList,
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
    },
    activeTaskId: 2
  }
}

export default meta

type Story = StoryObj<TaskListProps>

export const Default: Story = {
  render: ({ ...args }) => <TaskList {...args} />
}
