import { ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BrowserRouter as Router,
  createMemoryRouter,
  RouterProvider
} from 'react-router-dom'
import { AppProviders } from '../context'
import { QueryClient } from '@tanstack/react-query'
import { testQueryConfig } from '../context/query-config'
import { routeConfig } from '../App'

export const testQueryClient = new QueryClient(testQueryConfig)

const Wrapper = ({ children }: { children: ReactNode }) => (
  <AppProviders client={testQueryClient}>
    <Router>{children}</Router>
  </AppProviders>
)

const render = (ui: ReactElement) => {
  const result = {
    ...rtlRender(ui, { wrapper: Wrapper })
  }

  return result
}

const renderWithRouter = ({ route = '/', ...renderOptions } = {}) => {
  window.history.pushState({}, 'Test page', route)

  const result = {
    ...rtlRender(
      <AppProviders client={testQueryClient}>
        <RouterProvider router={createMemoryRouter(routeConfig)} />
      </AppProviders>,
      renderOptions
    )
  }

  return result
}

export * from '@testing-library/react'
export { render, renderWithRouter, userEvent }
