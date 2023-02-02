import { FC, ReactElement } from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { theme } from '@timespark/styles'

type Props = {
  children?: ReactElement
}

const AppProviders: FC = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

const render = (ui: ReactElement) => {
  const result = {
    ...rtlRender(ui, {
      wrapper: AppProviders
    })
  }

  return result
}

export * from '@testing-library/react'
export { render, userEvent }
