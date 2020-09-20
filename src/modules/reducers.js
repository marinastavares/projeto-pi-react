import { combineReducers } from 'redux'

import labs from './labs/reducers'
import loading from './loading/reducers'
import error from './error/reducers'
import energy from './energy/reducers'

const appReducer = combineReducers({
  loading,
  error,
  labs,
  energy,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
