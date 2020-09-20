import { defineAction } from 'redux-define'

import * as labsServices from 'services/labs'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_LABS = defineAction('GET_LABS', REQUEST)
export const SET_QUERY = 'SET_QUERY'

export const getLabs = () => (dispatch) => {
  dispatch({
    type: GET_LABS.ACTION,
    payload: labsServices.getLabs(),
  })
}

export const setQuery = (value) => (dispatch) => {
  dispatch({
    type: SET_QUERY,
    payload: value,
  })
}
