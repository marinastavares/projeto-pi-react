import produce from 'immer'
import { format } from 'date-fns'

import { createReducer } from 'utils/redux'

import {
  GET_DME_INFO,
  GET_DME_E,
  GET_DME_V,
  GET_DME_A,
  GET_DME_W,
} from './actions'

const INITIAL_STATE = {
  DME: {},
}

const groupByPhase = (payload, end) => {
  const orderPayload = payload.sort(
    (A, B) => new Date(A[`date${end}`]) - new Date(B[`date${end}`])
  )
  const group = orderPayload.reduce((res, obj) => {
    // for each object obj in the array arr
    const key = obj[`phase${end}`] // let key be the concatination of locA and locB
    const newObj = obj // create a new object based on the object obj
    if (res[key])
      // if res has a sub-array for the current key then...
      res[key].push(newObj)
    // ... push newObj into that sub-array                                                        // otherwise...
    else res[key] = [newObj] // ... create a new sub-array for this key that initially contain newObj
    return res
  }, {})
  Object.keys(group).map((key) => {
    group[key] = group[key].map((data) => ({
      ...data,
      [`date${end}`]: format(new Date(data[[`date${end}`]]), 'd/L H:mm'),
    }))
    return null
  })

  return group
}

const dme = createReducer(INITIAL_STATE, {
  [GET_DME_INFO.FULFILLED]: (state, { payload, meta }) => {
    console.log('groupByPhase -> payload?.perc?.length', payload?.perc?.length)
    if (payload?.perc?.length === 0) {
      return produce(state, (previousState) => {
        // eslint-disable-next-line no-param-reassign
        previousState.DME[meta.idDME] = { disabled: true }
      })
    }
    return produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.DME[meta.idDME] = payload
    })
  },
  [GET_DME_A.FULFILLED]: (state, { payload, meta }) => {
    const group = groupByPhase(payload, 'A')
    return produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.DME[meta.idDME].current = {
        value: Object.keys(group).map((value) => ({
          name: `Fase ${value}`,
          data: group[value].map((data) => data.valueA),
        })),
        date: group[2].map((values) => values.dateA),
      }
    })
  },
  [GET_DME_V.FULFILLED]: (state, { payload, meta }) => {
    const group = groupByPhase(payload, 'V')
    return produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.DME[meta.idDME].voltage = {
        value: Object.keys(group).map((value) => ({
          name: `Fase ${value}`,
          data: group[value].map((data) => data.valueV),
        })),
        date: group[2].map((values) => values.dateV),
      }
    })
  },
  [GET_DME_W.FULFILLED]: (state, { payload, meta }) => {
    const group = groupByPhase(payload, 'W')
    return produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.DME[meta.idDME].potency = {
        value: Object.keys(group).map((value) => ({
          name: `Fase ${value}`,
          data: group[value].map((data) => data.valueW),
        })),
        date: group[2].map((values) => values.dateW),
      }
    })
  },
  [GET_DME_E.FULFILLED]: (state, { payload, meta }) => {
    const group = groupByPhase(payload, 'E')
    return produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.DME[meta.idDME].energy = {
        value: Object.keys(group).map((value) => ({
          name: `Fase ${value}`,
          data: group[value].map((data) => data.valueE),
        })),
        date: group[2].map((values) => values.dateE),
      }
    })
  },
})

export default dme
