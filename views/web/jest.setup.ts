import '@testing-library/jest-dom/extend-expect'
import { taskClient } from '@timespark/infrastructure'
import { server } from './src/mock/server/test-server'
import { testQueryClient } from './src/utils/rtl-utils'

jest.mock('./src/utils/timerWorker')

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' })
})

afterEach(() => server.resetHandlers())

afterEach(() => {
  testQueryClient.clear()
  taskClient.clearTasks()
  window.localStorage.clear()
})

afterAll(() => server.close())
