import { defineAction } from 'redux-define'

import * as energyService from 'services/energy'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_ENERGY = defineAction('GET_ENERGY', REQUEST)
export const GET_ENERGY_AVERAGE = defineAction('GET_ENERGY_AVERAGE', REQUEST)
export const GET_PEAK_CURRENT = defineAction('GET_PEAK_CURRENT', REQUEST)

export const getMostEnergy = () => (dispatch, getState) => {
  dispatch({
    type: GET_ENERGY.ACTION,
    payload: energyService.getMostEnergy(getState().labs.query),
  })
}

export const getEnergyAverage = () => (dispatch, getState) => {
  dispatch({
    type: GET_ENERGY_AVERAGE.ACTION,
    payload: energyService.getEnergyAverage(getState().labs.query),
  })
}

export const getPeakCurrent = () => (dispatch, getState) => {
  dispatch({
    type: GET_PEAK_CURRENT.ACTION,
    payload: energyService.getPeakCurrent(getState().labs.query),
  })
}
