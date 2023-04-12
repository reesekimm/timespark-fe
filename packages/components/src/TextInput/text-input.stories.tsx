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
    value: '',
    onChange: () => {
      return
    },
    label: 'Task',
    placeholder: "Let's dive in!",
    inputSize: 'medium'
  }
}

export default meta

type Story = StoryObj<TextInputProps>

export const Default: Story = {
  render: ({ ...args }) => <TextInput {...args} />
}

export const MaxLength: Story = {
  args: {
    value: 'hello',
    maxLength: 15
  },
  render: ({ ...args }) => <TextInput {...args} />
}
