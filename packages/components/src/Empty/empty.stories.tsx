import type { Meta, StoryObj } from '@storybook/react'
import { Empty, Props } from './empty'

const meta: Meta<Props> = {
  title: 'Empty',
  component: Empty,
  argTypes: {
    description: {
      control: {
        type: 'text'
      }
    }
  },
  args: { description: 'Add your first task :)' }
}

export default meta

type Story = StoryObj<Props>

export const Default: Story = {
  render: ({ ...args }) => <Empty {...args} />
}
