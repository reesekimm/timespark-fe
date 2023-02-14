import type { Meta, StoryObj } from '@storybook/react'
import { TextInput, Props as TextInputProps } from './text-input'

const meta: Meta<TextInputProps> = {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    inputSize: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' }
    }
  },
  args: {
    inputSize: 'small',
    placeholder: "Let's dive in!"
  }
}

export default meta

type Story = StoryObj<TextInputProps>

export const Default: Story = {
  render: ({ ...args }) => <TextInput {...args} />
}
