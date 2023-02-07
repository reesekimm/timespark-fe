import type { Meta, StoryObj } from '@storybook/react'
import { Anchor, Props as AnchorProps } from './anchor'

const meta: Meta<AnchorProps> = {
  title: 'Anchor',
  component: Anchor
}

export default meta

type Story = StoryObj<AnchorProps>

export const Default: Story = {
  render: () => <Anchor href='#'>Link</Anchor>
}
