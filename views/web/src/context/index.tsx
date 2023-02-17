import { ReactNode } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  toast,
  ToastContainer,
  ToastPosition,
  Theme as ToastTheme
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '@timespark/styles'
import { HttpError } from '@timespark/infrastructure'
import { AuthProvider } from './auth-context'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: (error) =>
        Boolean(
          error instanceof HttpError && error.status && error.status >= 500
        )
    },
    mutations: {
      useErrorBoundary: (error) =>
        Boolean(
          error instanceof HttpError && error.status && error.status >= 500
        )
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof HttpError) {
        toast.error(error.message)
      }

      toast.error('Oops, something went wrong...')
    }
  })
})

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

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
      <ToastContainer {...toastConfig} />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}
