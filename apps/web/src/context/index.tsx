import { theme } from '@timespark/styles'
import { FC, ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'

type Props = {
  children?: ReactElement
}

export const AppProviders: FC = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
