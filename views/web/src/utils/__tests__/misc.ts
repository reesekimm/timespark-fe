import { formatDate } from '../misc'

test('formatDate formats the date', () => {
  expect(formatDate('2023-02-16T20:32:00.000Z')).toEqual('2023.02.17 05:32')
})
