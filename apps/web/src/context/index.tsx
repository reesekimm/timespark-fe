import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '@timespark/styles'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
)
