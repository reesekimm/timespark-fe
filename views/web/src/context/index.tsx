import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  ToastContainer,
  ToastPosition,
  Theme as ToastTheme
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '@timespark/styles'
import { AuthProvider } from './auth-context'
import { defaultQueryConfig } from './query-config'

const toastConfig = {
  position: 'top-right' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light' as ToastTheme
}

type Props = {
  children: ReactNode
  client?: QueryClient
}

export const queryClient = new QueryClient(defaultQueryConfig)

export function AppProviders({ children, client = queryClient }: Props) {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
      <ToastContainer {...toastConfig} />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}
