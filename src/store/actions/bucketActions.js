import { mainBucketFilter } from '../../functions/filterFuncs'

export const createBucket = (bucket) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
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
    let writeArray = []
    let batchArray = []

    firestore.get({collection: 'buckets', where: ['userId', '==', userId] ,orderBy: ['order']}).then((response) => {
      console.log('orig response', response)
      response.forEach((doc)=> {
        writeArray.push({...doc.data(), id: doc.id})
      })
      console.log('docArray', writeArray);
      batchArray = mainBucketFilter(writeArray, value);
      console.log('filter results', batchArray);
    }).then(() => {
      batchArray[0].forEach(bucket => {
        firestore.update({ collection: 'buckets', doc: bucket.id}, {currentValue: bucket.newCurrentValue, valueChange: bucket.valueChange}).then(() => {
          dispatch({ type: 'FILTER_BUCKET'})
        }).catch((err) => {
          dispatch({ type: 'FILTER_BUCKET_ERROR', err})
        })
      })
    }).then(() => {
      firestore.update({collection: 'moneybuckets', where:['userId', '==', userId]}, {value: batchArray[1]})
    }).then(()=> {
      dispatch({ type: 'MONEYBUCKET_UPDATE'})
    }).catch((err) => {
      dispatch({ type: 'MONEYBUCKET_UPDATE_ERROR', err})
    })
  }
}

export const reorderBuckets = (buckets) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid
    buckets.forEach((bucket, index) => {

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
    const userId = getState().firebase.auth.uid;

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
