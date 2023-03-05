import { format, parseISO, startOfToday, startOfTomorrow } from 'date-fns'
import { useDebugValue, useEffect, useRef, useState } from 'react'

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
 * @returns formatted date string
 */
const formatDate = (date: string) => format(parseISO(date), 'yyyy.MM.dd HH:mm')

/**
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
function useLocalStorageState(
  key: string,
  defaultValue: string | number | null,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return defaultValue
  })

  useDebugValue(`${key}: ${serialize(state)}`)

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
  }, [key])

  useEffect(() => {
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

export { getPeriodToday, formatDate, useLocalStorageState }
