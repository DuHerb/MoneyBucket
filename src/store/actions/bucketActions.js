
export const createBucket = (bucket) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('buckets').add({
      ...bucket,
      isDisabled: false,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_BUCKET', bucket})
    }).catch((err) => {
      dispatch({ type: 'CREAT_BUCKET_ERROR', err})
    })
  }
};