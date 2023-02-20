import { format, parseISO, startOfToday, startOfTomorrow } from 'date-fns'

/**
 * @returns ISO formatted date strings
 *
 * @example
 * If today is 'Fri Feb 17 2023 GMT+0900 (Korean Standard Time)', result would be:
 * ```ts
 * {
 *   "from": "2023-02-16T15:00:00.000Z",
 *   "to": "2023-02-17T15:00:00.000Z"
 * }
 * ```
 */
const getPeriodToday = () => {
  return {
    from: startOfToday().toISOString(),
    to: startOfTomorrow().toISOString()
  }
}

/**
 * @param date - date string in ISO format
 * @returns formatted date string
 */
const formatDate = (date: string) => format(parseISO(date), 'yyyy.MM.dd HH:mm')

export { getPeriodToday, formatDate }
