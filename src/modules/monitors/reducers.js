import produce from 'immer'

import { createReducer } from 'utils/redux'

import { GET_MONITORS } from './actions'

const INITIAL_STATE = {
  monitors: [],
}

const monitors = createReducer(INITIAL_STATE, {
  [GET_MONITORS.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.monitors = payload
    }),
})

export default monitors
