import { createSelector } from 'reselect'

export const dmeSelector = (state) => state.dme.DME

const getParam = (state, param) => param

export const getDMEById = createSelector(
  [dmeSelector, getParam],
  (DMEs, idDME) => {
    return DMEs[idDME]
  }
)
