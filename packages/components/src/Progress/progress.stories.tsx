import type { Meta, StoryObj } from '@storybook/react'
import { Progress, Props } from './progress'

const meta: Meta<Props> = {
  title: 'Progress',
  component: Progress,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } }
  },
  args: {
    value: 20
  }
}

export default meta

type Story = StoryObj<Props>

export const Default: Story = {
  render: ({ ...args }) => <Progress {...args} />
}
