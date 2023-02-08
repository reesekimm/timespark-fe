import type { Meta, StoryObj } from '@storybook/react'
import { Anchor, Props as AnchorProps } from './anchor'

const meta: Meta<AnchorProps> = {
  title: 'Anchor',
  component: Anchor
}

export default meta

type Story = StoryObj<AnchorProps>

export const Default: Story = {
  render: () => <Anchor href='#'>Default Link</Anchor>
}

export const RouterLink: Story = {
  render: () => (
    <Anchor type='link' to='router'>
      Router Link
    </Anchor>
  )
}

export const NavLink: Story = {
  render: () => (
    <Anchor type='navLink' to='nav'>
      Nav Link
    </Anchor>
  )
}
