import { startOfToday, startOfTomorrow } from 'date-fns'

const getPeriodToday = () => {
  return {
    from: startOfToday(),
    to: startOfTomorrow()
  }
}

export { getPeriodToday }
