import produce from 'immer'

import { createReducer } from 'utils/redux'

import { GET_MUSIC } from './actions'

const INITIAL_STATE = {
  module1: {
    voltage: [
      {
        createdAt: '09:01',
        value: '255',
        current: 1,
        potency: 110,
      },
      {
        createdAt: '09:02',
        value: '255.1',
        current: 1.2,
        potency: 110,
      },
      {
        createdAt: '09:03',
        value: '254',
        current: 0.8,
        potency: 112,
      },
      {
        createdAt: '09:04',
        value: '256',
        current: 0.6,
        potency: 119,
      },
      {
        createdAt: '09:05',
        value: '255',
        current: 1,
        potency: 120,
      },
      {
        createdAt: '09:06',
        value: '255.1',
        current: 1.2,
        potency: 119,
      },
      {
        createdAt: '09:07',
        value: '254',
        current: 1.1,
        potency: 150,
      },
      {
        createdAt: '09:08',
        value: '256',
        current: 0.9,
        potency: 111,
      },
      {
        createdAt: '09:09',
        value: '255',
        current: 1.1,
        potency: 117,
      },
      {
        createdAt: '09:10',
        value: '255.1',
        current: 1.1,
        potency: 117,
      },
    ],
  },
}

const name = createReducer(INITIAL_STATE, {
  [GET_MUSIC.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.fullName = payload.name
    }),
})

export default name
