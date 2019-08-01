import { mainBucketFilter } from '../../functions/filterFuncs'

export const createBucket = (bucket) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    // const profile = getState().firebase.profile
    const userId = getState().firebase.auth.uid

    firestore.collection('buckets').add({
      ...bucket,
      userId: userId,
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

export const makeDeposit = (value) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    let tempArray = []
    firestore.get({collection: 'buckets', where: ['userId', '==', userId] ,orderBy: ['order']}).then((response) => {
      console.log(response)
      response.forEach(doc => {
        tempArray.push(doc.data())
      })
      console.log(tempArray);
      const batchArray = mainBucketFilter(tempArray, value);
      console.log(batchArray);
      
      
    })
  }
}

export const reorderBuckets = (buckets) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid
    buckets.forEach((bucket, index) => {
      // console.log(bucket, index);
      firestore.update({ collection: 'buckets', doc: bucket.id}, {order: index}).then(() => {
        dispatch({ type: 'REORDER_BUCKETS', buckets})
      }).catch((err) => {
        dispatch({ type: 'REORDER_BUCKETS_ERROR', err})
      })
    })
    firestore.get({collection: 'buckets', where: ['userId', '==', userId] ,orderBy: ['order']})
  }
}

export const toggleIsLocked = (bucket) => {
  return(dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid
    firestore.update({collection: 'buckets', doc: bucket.id}, {isLocked: !bucket.isLocked}).then(()=>{
      dispatch({ type: 'TOGGLE_LOCKED', bucket})
    }).catch((err) => {
      dispatch({ type: 'TOGGLE_LOCKED_ERROR', err})
    })
    firestore.get({collection: 'buckets', where: ['userId', '==', userId] ,orderBy: ['order']})
  }
}

export const reorderArray = (list, startIndex, endIndex) => {

  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed)

  return result;
}
