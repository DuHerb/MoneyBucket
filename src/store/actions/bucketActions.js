
export const createBucket = (bucket) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('buckets').add({
      ...bucket,
      currentValue: 0,
      isLocked: false,
      isDisabled: false,
      createdAt: new Date(),
      order: 10000
    }).then(() => {
      dispatch({ type: 'CREATE_BUCKET', bucket})
    }).catch((err) => {
      dispatch({ type: 'CREAT_BUCKET_ERROR', err})
    })
  }
};

export const reorderBuckets = (buckets) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    // console.log(buckets);
    buckets.forEach((bucket, index) => {
      // console.log(bucket, index);
      firestore.update({ collection: 'buckets', doc: bucket.id}, {order: index}).then(() => {
        dispatch({ type: 'REORDER_BUCKETS', buckets})
      }).catch((err) => {
        dispatch({ type: 'REORDER_BUCKETS_ERROR', err})
      })
    })
    firestore.get({collection: 'buckets', where: ['name', '==', 'm'] ,orderBy: ['order']})
  }
}

export const toggleIsLocked = (bucket) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.update({collection: 'buckets', doc: bucket.id}, {isLocked: !bucket.isLocked}).then(()=>{
      dispatch({ type: 'TOGGLE_LOCKED', bucket})
    }).catch((err) => {
      dispatch({ type: 'TOGGLE_LOCKED_ERROR', err})
    })
    //need to return anything else?
    firestore.get({collection: 'buckets', where: ['name', '==', 'm'] ,orderBy: ['order']})
  }
}


export const reorderArray = (list, startIndex, endIndex) => {
  // console.log('from reorder function', list);

  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed)

  return result;
}
