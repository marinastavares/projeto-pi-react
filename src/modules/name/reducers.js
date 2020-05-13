import produce from 'immer'

import { createReducer } from 'utils/redux'

import { GET_MUSIC } from './actions'

const INITIAL_STATE = {
  module1: {
    voltage: [
      {
        createdAt: '09:01',
        value: '255',
      },
      {
        createdAt: '09:02',
        value: '255.1',
      },
      {
        createdAt: '09:03',
        value: '254',
      },
      {
        createdAt: '09:04',
        value: '256',
      },
      {
        createdAt: '09:05',
        value: '255',
      },
      {
        createdAt: '09:06',
        value: '255.1',
      },
      {
        createdAt: '09:07',
        value: '254',
      },
      {
        createdAt: '09:08',
        value: '256',
      },
      {
        createdAt: '09:09',
        value: '255',
      },
      {
        createdAt: '09:10',
        value: '255.1',
      },
      {
        createdAt: '09:11',
        value: '254',
      },
      {
        createdAt: '09:12',
        value: '256',
      },
      {
        createdAt: '09:13',
        value: '255',
      },
      {
        createdAt: '09:14',
        value: '255.1',
      },
      {
        createdAt: '09:15',
        value: '254',
      },
      {
        createdAt: '09:16',
        value: '256',
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
