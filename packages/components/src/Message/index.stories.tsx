import type { Meta, StoryObj } from '@storybook/react'
import { Message } from '.'

const meta: Meta<typeof Message> = {
  title: 'Example/Message',
  component: Message
}

export default meta

type Story = StoryObj<typeof Message>

export const Default: Story = {
  args: {
    message: 'message!'
  }
}
