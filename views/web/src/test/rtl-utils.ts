import { ReactElement } from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppProviders } from '../context'

const render = (ui: ReactElement) => {
  const result = {
    ...rtlRender(ui, { wrapper: AppProviders })
  }

  return result
}

export * from '@testing-library/react'
export { render, userEvent }
