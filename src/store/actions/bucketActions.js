
export const createBucket = (bucket) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('buckets').add({
      ...bucket,
      isDisabled: false,
      createdAt: new Date(),
      order: 1000
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
    firestore.get({collection: 'buckets', orderBy: ['order']})
  }
}

// export const reorderBuckets = (buckets) => {
//   return (dispatch, getState, {getFirebase, getFirestore}) => {
//     console.log('getState from action', buckets)
//     dispatch({ type: 'REORDER_BUCKETS', buckets})

//   }
// }

export const reorderArray = (list, startIndex, endIndex) => {
  // console.log('from reorder function', list);

  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed)

  return result;
}
