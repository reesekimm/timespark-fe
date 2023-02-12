import { FC, ReactElement } from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { theme } from '@timespark/styles'
import { BrowserRouter as Router } from 'react-router-dom'

type Props = {
  children?: ReactElement
}

const Wrapper: FC = ({ children }: Props) => (
  <Router>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Router>
)

const render = (ui: ReactElement) => {
  const result = {
    ...rtlRender(ui, {
      wrapper: Wrapper
    })
  }

  return result
}

export * from '@testing-library/react'
export { render, userEvent }
