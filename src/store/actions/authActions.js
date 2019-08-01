export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS'})
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err})
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS'});
    })
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((response) => {
        let batch = firestore.batch();
        let newUserDoc = firestore.collection('users').doc(response.user.uid);
        let newMoneybucketDoc = firestore.collection('moneybuckets').doc(response.user.uid)
        batch.set(newUserDoc, {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0]
        })
        batch.set(newMoneybucketDoc, {
          currentValue: 0,
          userId: response.user.uid
        })
        return batch.commit()
    }).then(()=> {
      dispatch({ type: 'SIGNUP_SUCCESS'})
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err})
    })
  }
}

// export const signUp = (newUser) => {
//   return (dispatch, getState, {getFirebase, getFirestore}) => {
//     const firebase = getFirebase();
//     const firestore = getFirestore();

//     firebase.auth().createUserWithEmailAndPassword(
//       newUser.email,
//       newUser.password
//     ).then((response) => {
//         return firestore.collection('users').doc(response.user.uid).set({
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           initials: newUser.firstName[0] + newUser.lastName[0]
//         })
//     }).then(() => {
//       dispatch({ type: 'SIGNUP_SUCCESS'})
//     }).catch((err) => {
//       dispatch({ type: 'SIGNUP_ERROR', err})
//     }).then((response) => {
//         return firestore.collection('moneybuckets').doc().set({
//         currentValue: 0,
//         userId: response.user.uid
//       })
//     }).then(()=> {
//       dispatch({ type: 'MONEYBUCKET_CREATED'})
//     }).catch((err) => {
//       dispatch({ type: 'MONEYBUCKET_CREATE_ERROR', err})
//     })
//   }
// }