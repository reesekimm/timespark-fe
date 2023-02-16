import axios, { AxiosRequestConfig, isAxiosError } from 'axios'
import { CustomError, Http } from '../types'

const headers = {
  'Content-Type': 'application/json'
}

export const httpAxios: Http = {
  get: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await axios.get(path, {
        ...config,
        params: params,
        headers
      })
      return response.data as T
    } catch (error) {
      handleError(error)
    }
  },
  post: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await axios.post(
        path,
        { ...params },
        { ...config, headers }
      )
      return response.data as T
    } catch (error) {
      handleError(error)
    }
  },
  put: async <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await axios.put(
        path,
        { ...params },
        { ...config, headers }
      )
      return response.data as T
    } catch (error) {
      handleError(error)
    }
  },
  delete: async <T>(
    path: string,
    params?: unknown,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await axios.delete(path, {
        ...config,
        params: params,
        headers
      })
      return response.data as T
    } catch (error) {
      handleError(error)
    }
  }
}

export class HttpError implements CustomError {
  name: string
  message: string
  status?: number
  code?: string

  constructor({ name, status, code, message }: CustomError) {
    this.name = name
    this.message = message
    this.status = status
    this.code = code
  }
}

function handleError(error: unknown): Error | HttpError {
  if (isAxiosError(error)) {
    throw new HttpError({
      name: 'AxiosHttpError',
      status: error.response?.status,
      code: `AXIOS_${error.code ?? 'ERROR'}`,
      message: error.message
    })
  } else if (error instanceof Error) {
    throw error
  } else {
    throw new HttpError({
      name: 'UnexpectedHttpError',
      message: 'An unexpected error occurred'
    })
  }
}
