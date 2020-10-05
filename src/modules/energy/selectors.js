import { fade } from '@material-ui/core/styles/colorManipulator'

import { GET_ENERGY, GET_ENERGY_AVERAGE, GET_PEAK_CURRENT } from './actions'

export const mostUsedSelectors = (state) =>
  state.energy.mostUsed
    .map((value) => ({
      title: value.lab,
      value: value.percE,
    }))
    .sort((valueA, valueB) => -valueA.value + valueB.value)
    .map((value, index) => ({
      ...value,
      color: fade('#3751FF', 1 - 0.35 * index),
    }))

export const mostUsedLoading = (state) => state.loading[GET_ENERGY.ACTION]
export const averageLoading = (state) =>
  state.loading[GET_ENERGY_AVERAGE.ACTION]
export const peakCurrentLoading = (state) =>
  state.loading[GET_PEAK_CURRENT.ACTION]
export const averageSelector = (state) => state.energy.avg
export const peakCurrentSelector = (state) => state.energy.peakCurrent
export const energySelector = (state) => state.energy
