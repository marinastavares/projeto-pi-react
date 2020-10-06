/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { format, utcToZonedTime } from 'date-fns-tz'

import { createReducer } from 'utils/redux'

import {
  GET_ENERGY,
  GET_ENERGY_AVERAGE,
  GET_PEAK_CURRENT,
  GET_SUM_HOUR,
  GET_PORCENTUAL_LAB,
  GET_WEEKLY_ENERGY,
  GET_WEEKLY_PORCENTUAL,
} from './actions'

const INITIAL_STATE = {
  mostUsed: [],
  avg: 0,
  peakCurrent: {},
  sumPotency: [],
  porcentual: [],
  weeklyEnergy: [],
  potWeekday: [],
}

const WEEKDAYS = {
  1: 'Domingo',
  2: 'Segunda',
  3: 'Terça',
  4: 'Quarta',
  5: 'Quinta',
  6: 'Sexta',
  7: 'Sábado',
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
  [GET_SUM_HOUR.FULFILLED]: (state, { payload }) => {
    const orderPayload = payload.sort(
      (A, B) => new Date(A.date) - new Date(B.date)
    )
    const group = orderPayload.reduce((res, obj) => {
      // for each object obj in the array arr
      const key = obj.lab // let key be the concatination of locA and locB
      const newObj = obj // create a new object based on the object obj
      if (res[key])
        // if res has a sub-array for the current key then...
        res[key].push(newObj)
      // ... push newObj into that sub-array                                                        // otherwise...
      else res[key] = [newObj] // ... create a new sub-array for this key that initially contain newObj
      return res
    }, {})
    return produce(state, (previousState) => {
      previousState.sumPotency = Object.entries(group).map((values) => ({
        title: values[0],
        date: values[1].map((value) => {
          const localDate = new Date(value.date)
          const londonTimeZone = 'Europe/London'
          const londonDate = utcToZonedTime(localDate, londonTimeZone)
          return format(londonDate, 'dd/M hh:mm', {
            timeZone: 'Europe/London',
          })
        }),
        value: values[1].map((value) => value.wTotal),
      }))
    })
  },
  [GET_PORCENTUAL_LAB.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      previousState.porcentual = payload
    }),
  [GET_WEEKLY_ENERGY.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      previousState.weeklyEnergy = payload
    }),
  [GET_WEEKLY_PORCENTUAL.FULFILLED]: (state, { payload }) => {
    const orderPayload = payload.sort(
      (A, B) => new Date(A.date) - new Date(B.date)
    )
    const group = orderPayload.reduce((res, obj) => {
      // for each object obj in the array arr
      const key = obj.dayOfWeek // let key be the concatination of locA and locB
      const newObj = obj // create a new object based on the object obj
      if (res[key])
        // if res has a sub-array for the current key then...
        res[key].push(newObj)
      // ... push newObj into that sub-array                                                        // otherwise...
      else res[key] = [newObj] // ... create a new sub-array for this key that initially contain newObj
      return res
    }, {})
    return produce(state, (previousState) => {
      previousState.potWeekday = Object.entries(group).map((values) => {
        const hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(
          (value, index) => `${index}:00`
        )
        const dateValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(
          () => `0`
        )
        return {
          title: WEEKDAYS[values[0]],
          date: [
            ...hours,
            ...values[1].map((value) => {
              const localDate = new Date(value.date)
              const londonTimeZone = 'Europe/London'
              const londonDate = utcToZonedTime(localDate, londonTimeZone)
              return format(londonDate, 'dd/mm HH:mm', {
                timeZone: 'Europe/London',
              })
            }),
          ],
          value: [...dateValues, ...values[1].map((value) => value.wAvg)],
        }
      })
    })
  },
})

export default energy
