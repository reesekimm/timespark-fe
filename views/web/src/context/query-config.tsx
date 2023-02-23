import {
  MutationCache,
  QueryCache,
  QueryClientConfig
} from '@tanstack/react-query'
import { HttpError } from '@timespark/infrastructure'
import { toast } from 'react-toastify'
import { ERROR_MESSAGES } from '../utils/constants'

const onErrorCallback = (error: unknown) => {
  const err = error as HttpError

  if (!err.status) {
    toast.error(err.message)
    return
  }

  if (err.status >= 500) {
    toast.error(ERROR_MESSAGES.SERVER_DOWN)
  } else if (err.status === 401) {
    toast.info(ERROR_MESSAGES.UNAUTHORIZED)
  } else {
    console.error(error)
    toast.error(ERROR_MESSAGES.REQUEST_FAILED)
  }
}

const defaultQueryCache = new QueryCache({
  onError: onErrorCallback
})

const defaultMutationCache = new MutationCache({
  onError: onErrorCallback
})

export const defaultQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  },
  queryCache: defaultQueryCache,
  mutationCache: defaultMutationCache
}

export const testQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  },
  queryCache: defaultQueryCache,
  mutationCache: defaultMutationCache,
  logger: {
    log: console.log,
    warn: console.warn,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {}
  }
}
