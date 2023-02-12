import { ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProviders } from '../context'

const Wrapper = ({ children }: { children: ReactNode }) => (
  <AppProviders>
    <Router>{children}</Router>
  </AppProviders>
)

const render = (ui: ReactElement) => {
  const result = {
    ...rtlRender(ui, { wrapper: Wrapper })
  }

  return result
}

export * from '@testing-library/react'
export { render, userEvent }
