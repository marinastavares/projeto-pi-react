import produce from 'immer'

import { createReducer } from 'utils/redux'

import { GET_MUSIC } from './actions'

const INITIAL_STATE = {
  fullName: '',
}

const user = createReducer(INITIAL_STATE, {
  [GET_MUSIC.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.fullName = payload.name
    }),
})

export default user
