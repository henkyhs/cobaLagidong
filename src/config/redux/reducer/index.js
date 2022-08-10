import { combineReducers } from '@reduxjs/toolkit'

import UserReducer from './user'
import LoadingReducer from './loading'

export default combineReducers({
  UserReducer,
  LoadingReducer,
})