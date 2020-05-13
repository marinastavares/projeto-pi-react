import { combineReducers } from 'redux'

import user from './user/reducers'
import loading from './loading/reducers'
import error from './error/reducers'
import name from './name/reducers'

const appReducer = combineReducers({
  loading,
  error,
  user,
  name,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
