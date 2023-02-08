import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '@timespark/styles'
import { AuthProvider } from './auth-context'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
