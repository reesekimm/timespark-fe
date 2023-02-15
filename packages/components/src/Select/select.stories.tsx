import type { Meta, StoryObj } from '@storybook/react'
import { Select, Props as SelectProps } from './select'

const meta: Meta<SelectProps> = {
  title: 'Select',
  component: Select,
  argTypes: {
    selectSize: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' }
    }
  },
  args: {
    label: 'Category',
    options: [
      { value: '', label: 'None' },
      { value: 'workout', label: 'Workout' },
      { value: 'meditation', label: 'Meditation' },
      { value: 'study', label: 'Study' }
    ],
    selectSize: 'medium'
  }
}

export default meta

type Story = StoryObj<SelectProps>

export const Default: Story = {
  render: ({ ...args }) => <Select {...args} />
}
