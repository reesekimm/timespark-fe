import type { Meta, StoryObj } from '@storybook/react'
import { theme } from '@timespark/styles'
import { Tag, Props } from './tag'

const meta: Meta<Props> = {
  title: 'Tag',
  component: Tag,
  argTypes: {
    color: {
      control: {
        type: 'color'
      }
    }
  },
  args: {
    value: 'Category 1',
    color: theme.palette.gray[300]
  }
}

export default meta

type Story = StoryObj<Props>

export const Default: Story = {
  render: ({ ...args }) => <Tag {...args} />
}
