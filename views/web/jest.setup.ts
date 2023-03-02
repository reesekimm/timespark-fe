import '@testing-library/jest-dom/extend-expect'
import { server } from './src/mock/server/test-server'
import * as tasksDB from './src/mock/tasks'
import { testQueryClient } from './src/utils/rtl-utils'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' })
})

afterEach(() => server.resetHandlers())

afterEach(() => {
  testQueryClient.clear()
  tasksDB.clear()
})

afterAll(() => server.close())
