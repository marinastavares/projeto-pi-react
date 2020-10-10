import { defineAction } from 'redux-define'

import * as dmeService from 'services/dme'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_DME_INFO = defineAction('GET_DME_INFO', REQUEST)
export const GET_DME_A = defineAction('GET_DME_A', REQUEST)
export const GET_DME_V = defineAction('GET_DME_V', REQUEST)
export const GET_DME_W = defineAction('GET_DME_W', REQUEST)
export const GET_DME_E = defineAction('GET_DME_E', REQUEST)

export const getDMEInfo = (idDME) => (dispatch, getState) => {
  dispatch({
    type: GET_DME_INFO.ACTION,
    payload: dmeService.getDMEInfo(idDME, getState().labs.query),
    meta: { idDME },
  })
}
export const getDmeA = (idDME) => (dispatch, getState) => {
  dispatch({
    type: GET_DME_A.ACTION,
    payload: dmeService.getDmeA(idDME, getState().labs.query),
    meta: { idDME },
  })
}
export const getDmeV = (idDME) => (dispatch, getState) => {
  dispatch({
    type: GET_DME_V.ACTION,
    payload: dmeService.getDmeV(idDME, getState().labs.query),
    meta: { idDME },
  })
}
export const getDmeW = (idDME) => (dispatch, getState) => {
  dispatch({
    type: GET_DME_W.ACTION,
    payload: dmeService.getDmeW(idDME, getState().labs.query),
    meta: { idDME },
  })
}
export const getDmeE = (idDME) => (dispatch, getState) => {
  dispatch({
    type: GET_DME_E.ACTION,
    payload: dmeService.getDmeE(idDME, getState().labs.query),
    meta: { idDME },
  })
}
