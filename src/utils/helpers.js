import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'

export const transformDate = (difference) => ({
  finalDate: new Date().toISOString(),
  initialDate: subDays(new Date(), difference).toISOString(),
})

export const transformWeek = (date) => ({
  initialDate: date,
  finalDate: addDays(date, 7),
})
