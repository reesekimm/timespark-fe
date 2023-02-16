/* eslint-disable @typescript-eslint/no-explicit-any */
export type Http = {
  get: <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: any
  ) => Promise<T | any>
  post: <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: any
  ) => Promise<T | any>
  put: <T>(
    path: string,
    params?: Record<string, unknown>,
    config?: any
  ) => Promise<T | any>
  delete: <T>(path: string, params?: unknown, config?: any) => Promise<T | any>
}

export interface CustomError extends Error {
  status?: number
  code?: string
}
