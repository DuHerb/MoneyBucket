export const createBucket = (bucket) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch({ type: 'CREATE_BUCKET', bucket});
  }
};