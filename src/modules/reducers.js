import { combineReducers } from 'redux'

import user from './user/reducers'
import loading from './loading/reducers'
import error from './error/reducers'

const appReducer = combineReducers({
  loading,
  error,
  user,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
