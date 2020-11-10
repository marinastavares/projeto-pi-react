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

export const QUERIES = {
  TOTAL_ENERGY_MONTH: 'totalEnergyMonth',
  AVERAGE: 'average',
  PEAK_OF_CURRENT: 'peakOfCurrent',
  WEEKLY_ENERGY: 'weeklyEnergy',
  SUM_POTENCY: 'sumPotency',
  POTENCY_WEEKLY: 'potencyWeekly',
  PERCENTAGE_ENERGY: 'percentualEnergy',
}
