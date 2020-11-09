/* eslint-disable no-param-reassign */
import produce from 'immer'

import { createReducer } from 'utils/redux'
import { transformDate } from 'utils/helpers'
import { GET_DME_INFO } from 'modules/dme/actions'

import { GET_LABS, GET_LAB, SET_QUERY, SET_CUSTOM_QUERY } from './actions'

const INITIAL_STATE = {
  allQueries: {},
  query: transformDate(1),
  names: [],
  currentLab: {},
  hasChanged: false,
}

const groupByLab = (payload) => {
  const group = payload.reduce((res, obj) => {
    // for each object obj in the array arr
    const key = obj.lab.toUpperCase() // let key be the concatination of locA and locB
    const newObj = { ...obj, route: `/${obj.lab}` } // create a new object based on the object obj
    if (res[key])
      // if res has a sub-array for the current key then...
      res[key].push(newObj)
    // ... push newObj into that sub-array                                                        // otherwise...
    else res[key] = [newObj] // ... create a new sub-array for this key that initially contain newObj
    return res
  }, {})

  return group
}

const labs = createReducer(INITIAL_STATE, {
  [GET_LABS.FULFILLED]: (state, { payload }) => {
    const group = groupByLab(payload)
    return produce(state, (previousState) => {
      previousState.labs = group
      previousState.names = Object.keys(group).map((value) => ({
        name: value.toUpperCase(),
        route: `/${value}`,
      }))
    })
  },
  [GET_DME_INFO.FULFILLED]: (state, { payload }) => {
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
  [SET_CUSTOM_QUERY]: (state, { payload }) =>
    produce(state, (previousState) => {
      previousState.allQueries = {
        ...state.allQueries,
        [payload.name]: {
          initialDate: payload.initialDate,
          finalDate: payload.finalDate,
        },
      }
    }),
})

export default labs
