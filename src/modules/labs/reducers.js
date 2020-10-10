/* eslint-disable no-param-reassign */
import produce from 'immer'

import { createReducer } from 'utils/redux'
import { transformDate } from 'utils/helpers'
import { GET_DME_INFO } from 'modules/dme/actions'

import { GET_LABS, GET_LAB, SET_QUERY } from './actions'

const INITIAL_STATE = {
  query: transformDate(1),
  names: [],
  currentLab: {},
}

const labs = createReducer(INITIAL_STATE, {
  [GET_LABS.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      previousState.names = payload.map((values) => ({
        name: values.slug.toUpperCase(),
        route: `/${values.slug}`,
      }))
    }),
  [GET_DME_INFO.FULFILLED]: (state, { payload }) => {
    console.log('payload', payload)
    if (payload.lastA.length === 0) {
      return state
    }
    return produce(state, (previousState) => {
      previousState.currentLab.updatedAt = payload.lastA[1].date
    })
  },
  [GET_LAB.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      // eslint-disable-next-line prefer-destructuring
      previousState.currentLab = payload[0]
    }),
  [SET_QUERY]: (state, { payload }) =>
    produce(state, (previousState) => {
      previousState.query = payload === '' ? transformDate(1) : payload
    }),
})

export default labs
