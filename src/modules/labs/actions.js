import { defineAction } from 'redux-define'

import * as labsServices from 'services/labs'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_LABS = defineAction('GET_LABS', REQUEST)
export const GET_LAB = defineAction('GET_LAB', REQUEST)
export const GET_ALL_LABS = defineAction('GET_ALL_LABS', REQUEST)
export const CREATE_LABS = defineAction('CREATE_LABS', REQUEST)
export const TRIGGER_SNACKBAR = defineAction('TRIGGER_SNACKBAR', REQUEST)
export const SET_QUERY = 'SET_QUERY'
export const SET_CUSTOM_QUERY = 'SET_CUSTOM_QUERY'

export const getLabs = () => (dispatch) => {
  dispatch({
    type: GET_LABS.ACTION,
    payload: labsServices.getLabs(),
  })
}

export const getLab = (lab) => (dispatch) => {
  dispatch({
    type: GET_LAB.ACTION,
    payload: labsServices.getLab(lab)(),
    meta: { lab },
  })
}

export const getAllLabs = (lab) => (dispatch) => {
  dispatch({
    type: GET_ALL_LABS.ACTION,
    payload: labsServices.getAllLabs(lab)(),
    meta: { lab },
  })
}

export const createLabs = (payload) => (dispatch) => {
  dispatch({
    type: CREATE_LABS.ACTION,
    payload: labsServices.createLab(payload),
  })
}

export const setQuery = (value) => (dispatch) => {
  dispatch({
    type: SET_QUERY,
    payload: value,
  })
}

export const setCustomQuery = (value) => (dispatch) => {
  dispatch({
    type: SET_CUSTOM_QUERY,
    payload: value,
  })
}

export const triggerSnackbar = () => (dispatch) =>
  dispatch({
    type: TRIGGER_SNACKBAR.ACTION,
    payload: new Promise((res) => {
      setTimeout(() => {
        res()
      }, 10)
    }),
  })
