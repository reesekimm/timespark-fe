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
 * @param {String} date A date string in ISO format
 * @returns Formatted date string
 */
const formatDate = (date: string) => format(parseISO(date), 'yyyy.MM.dd HH:mm')

/**
 *
 * @returns Randomly generated hexadecimal color code
 *
 * @example
 * #586BBE
 *
 * Ref) https://stackoverflow.com/a/58326357/12220184
 */
const generateRandomColorCode = () => {
  const code = [...Array(6)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('')
    .toUpperCase()
  return `#${code}`
}

export { getPeriodToday, formatDate, generateRandomColorCode }
