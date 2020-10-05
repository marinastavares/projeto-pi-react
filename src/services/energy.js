/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
// import humps from 'humps'

import { get } from './requests'

export const getMostEnergy = (params) => get()('energy/lab/', params)
export const getEnergyAverage = (params) => get()('energy/avg/', params)
export const getPeakCurrent = (params) => get()('peak_current/', params)
export const getSumHour = (params) => get()('sum/hour/', params)
export const getPorcentualLab = (params) => get()('energy/lab/', params)
export const getWeeklyEnergy = (params) => get()('energy/dayOfWeek/', params)
export const getWeeklyPorcentual = (params) => get()('pot_weekday/', params)
