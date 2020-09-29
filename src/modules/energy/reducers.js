/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import produce from 'immer'

import { createReducer } from 'utils/redux'

import {
  GET_ENERGY,
  GET_ENERGY_AVERAGE,
  GET_PEAK_CURRENT,
  GET_SUM_HOUR,
} from './actions'

const INITIAL_STATE = {
  mostUsed: [],
  avg: 0,
  peakCurrent: {},
  sumPotency: [],
}

const energy = createReducer(INITIAL_STATE, {
  [GET_ENERGY.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      previousState.mostUsed = payload
    }),
  [GET_ENERGY_AVERAGE.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      previousState.avg = payload.avgEnergy
    }),
  [GET_PEAK_CURRENT.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      previousState.peakCurrent = payload
    }),
  [GET_SUM_HOUR.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      previousState.sumPotency = payload
    }),
})

export default energy
