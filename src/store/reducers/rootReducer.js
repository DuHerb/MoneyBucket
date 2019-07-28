import authReducer from './authReducer';
import bucketReducer from './bucketReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
  auth: authReducer,
  bucket: bucketReducer,
  firestore: firestoreReducer
})

export default rootReducer;