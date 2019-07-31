import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export const firebaseConfig = {
  apiKey: "AIzaSyCbNNvgEzfSYHjplMhvy4drbzttl_D8Y8U",
  authDomain: "moneybucket-86541.firebaseapp.com",
  databaseURL: "https://moneybucket-86541.firebaseio.com",
  projectId: "moneybucket-86541",
  storageBucket: "",
  messagingSenderId: "337059554993",
  appId: "1:337059554993:web:de3716681d6d99b3"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;