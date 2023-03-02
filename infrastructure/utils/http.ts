import axios, { AxiosRequestConfig, isAxiosError } from 'axios'
import { CustomError } from '../types'

export async function httpAxios(
  endpoint: string,
  options: AxiosRequestConfig = {}
) {
  const config = {
    url: endpoint,
    method: options.data ? 'POST' : 'GET',
    body: options.data ? JSON.stringify(options.data) : undefined,
    headers: {
      'Content-Type': options.data ? 'application/json' : undefined,
      ...options.headers
    },
    ...options
  }

  try {
    const { data } = await axios(config)
    return data
  } catch (error) {
    handleError(error)
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
