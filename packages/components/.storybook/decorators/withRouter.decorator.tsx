import type { StoryFn } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

export const withRouter = (Story: StoryFn) => (
  <Router>
    <Story />
  </Router>
)
