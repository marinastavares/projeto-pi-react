import { defineAction } from 'redux-define'

import * as energyService from 'services/energy'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_ENERGY = defineAction('GET_ENERGY', REQUEST)
export const GET_ENERGY_AVERAGE = defineAction('GET_ENERGY_AVERAGE', REQUEST)
export const GET_PEAK_CURRENT = defineAction('GET_PEAK_CURRENT', REQUEST)
export const GET_SUM_HOUR = defineAction('GET_SUM_HOUR', REQUEST)
export const GET_PORCENTUAL_LAB = defineAction('GET_PORCENTUAL_LAB', REQUEST)
export const GET_WEEKLY_ENERGY = defineAction('GET_WEEKLY_ENERGY', REQUEST)
export const GET_WEEKLY_PORCENTUAL = defineAction(
  'GET_WEEKLY_PORCENTUAL',
  REQUEST
)
export const GET_ENERGY_TOTAL = defineAction('GET_ENERGY_TOTAL', REQUEST)

export const getMostEnergy = () => (dispatch, getState) => {
  dispatch({
    type: GET_ENERGY.ACTION,
    payload: energyService.getMostEnergy(
      getState().labs.allQueries?.totalEnergyMonth
    ),
  })
}

export const getEnergyAverage = () => (dispatch, getState) => {
  dispatch({
    type: GET_ENERGY_AVERAGE.ACTION,
    payload: energyService.getEnergyAverage(getState().labs.allQueries.average),
  })
}

export const getPeakCurrent = () => (dispatch, getState) => {
  dispatch({
    type: GET_PEAK_CURRENT.ACTION,
    payload: energyService.getPeakCurrent(
      getState().labs.allQueries.peakOfCurrent
    ),
  })
}

export const getSumHour = () => (dispatch, getState) => {
  dispatch({
    type: GET_SUM_HOUR.ACTION,
    payload: energyService.getSumHour(getState().labs.allQueries.peakOfCurrent),
  })
}

export const getPorcentualLab = () => (dispatch, getState) => {
  dispatch({
    type: GET_PORCENTUAL_LAB.ACTION,
    payload: energyService.getPorcentualLab(
      getState().labs.allQueries.weeklyEnergy
    ),
  })
}

export const getWeeklyEnergy = () => (dispatch, getState) => {
  dispatch({
    type: GET_WEEKLY_ENERGY.ACTION,
    payload: energyService.getWeeklyEnergy(
      getState().labs.allQueries.weeklyEnergy
    ),
  })
}

export const getWeeklyPorcentual = () => (dispatch, getState) => {
  dispatch({
    type: GET_WEEKLY_PORCENTUAL.ACTION,
    payload: energyService.getWeeklyPorcentual(getState().labs.query),
  })
}

export const getEnergyTotal = () => (dispatch, getState) => {
  dispatch({
    type: GET_ENERGY_TOTAL.ACTION,
    payload: energyService.getEnergyTotal(getState().labs.query),
  })
}
