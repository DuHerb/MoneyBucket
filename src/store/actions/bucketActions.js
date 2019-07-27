export const createBucket = (bucket) => {
  return (dispatch, getState) => {
    //make async call
    dispatch({ type: 'CREATE_BUCKET', bucket});
  }
};