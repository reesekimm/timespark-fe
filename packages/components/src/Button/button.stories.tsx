import type { Meta, StoryObj } from '@storybook/react'
import { Button, Props as ButtonProps } from './button'

const meta: Meta<ButtonProps> = {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  },
  args: {
    disabled: false,
    size: 'small'
  }
}

export default meta

type Story = StoryObj<ButtonProps>

export const Default: Story = {
  args: {
    label: 'Default',
    variant: 'default'
  },
  render: ({ ...args }) => <Button {...args} />
}

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary'
  },

  render: ({ ...args }) => <Button {...args} />
}

export const Text: Story = {
  args: {
    label: 'Text',
    variant: 'text'
  },
  render: ({ ...args }) => <Button {...args} />
}
