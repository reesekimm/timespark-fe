import { ReactElement } from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const render = (ui: ReactElement) => {
  const result = {
    ...rtlRender(ui),
  }

  return result
}

export * from '@testing-library/react'
export { render, userEvent }
