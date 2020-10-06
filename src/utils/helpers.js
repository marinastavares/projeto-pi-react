import subDays from 'date-fns/subDays'

export const transformDate = (difference) => ({
  finalDate: new Date().toISOString(),
  initialDate: subDays(new Date(), difference).toISOString(),
})
