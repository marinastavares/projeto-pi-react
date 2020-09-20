import { combineReducers } from 'redux'

import labs from './labs/reducers'
import loading from './loading/reducers'
import error from './error/reducers'

const appReducer = combineReducers({
  loading,
  error,
  labs,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
