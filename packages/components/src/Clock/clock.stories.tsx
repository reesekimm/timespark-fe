import type { Meta, StoryObj } from '@storybook/react'
import { Clock, Props } from './clock'

const meta: Meta<Props> = {
  title: 'Clock',
  component: Clock,
  args: {
    totalSeconds: 30
  }
}

export default meta

type Story = StoryObj<Props>

export const Default: Story = {
  render: ({ ...args }) => <Clock {...args} />
}
