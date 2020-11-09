import { createSelector } from 'reselect'

export const dmeSelector = (state) => state.dme.DME
export const hasChangedSelector = (state) => state.dme.hasChanged

const getParam = (state, param) => param

export const getDMEById = createSelector(
  [dmeSelector, getParam],
  (DMEs, idDME) => {
    return DMEs[idDME]
  }
)
