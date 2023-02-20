import type { Meta, StoryObj } from '@storybook/react'
import { theme } from '@timespark/styles'
import { Spinner, Props as SpinnerProps } from './spinner'

const meta: Meta<SpinnerProps> = {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' }
    },
    color: {
      control: {
        type: 'color'
      }
    }
  },
  args: {
    size: 'medium',
    color: theme.palette.black
  }
}

export default meta

type Story = StoryObj<SpinnerProps>

export const Default: Story = {
  render: ({ ...args }) => <Spinner {...args} />
}
