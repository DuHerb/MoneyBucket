import authReducer from './authReducer';
import bucketReducer from './bucketReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  buckets: bucketReducer
})

export default rootReducer;