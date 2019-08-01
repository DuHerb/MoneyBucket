import authReducer from './authReducer';
import bucketReducer from './bucketReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  bucket: bucketReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer;