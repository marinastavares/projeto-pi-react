import subDays from 'date-fns/subDays'

export const transformDate = (difference) =>
  `initialDate=${new Date().toISOString()}&finalDate=${subDays(
    new Date(),
    difference
  ).toISOString()}`
