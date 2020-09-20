import produce from 'immer'

import { createReducer } from 'utils/redux'
import { transformDate } from 'utils/helpers'

import { GET_LABS, SET_QUERY } from './actions'

const INITIAL_STATE = {
  query: transformDate(1),
  names: [],
}

const labs = createReducer(INITIAL_STATE, {
  [GET_LABS.FULFILLED]: (state, { payload }) =>
    produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.names = payload.map((values) => ({
        name: values.name.toUpperCase(),
        route: `/${values.name}`,
      }))
    }),
  [SET_QUERY]: (state, { payload }) =>
    produce(state, (previousState) => {
      // eslint-disable-next-line no-param-reassign
      previousState.query = payload === '' ? transformDate(1) : payload
    }),
})

export default labs
