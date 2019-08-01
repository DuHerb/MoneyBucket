
// const initState = {
//   buckets: [
//     {id: '1', name: 'bucket 1', isDisabled: false},
//     {id: '2', name: 'bucket 2', isDisabled: false},
//     {id: '3', name: 'bucket 3', isDisabled: false},
//   ]
// }

const bucketReducer = (state = {}, action) => {
  switch(action.type) {
    case 'CREATE_BUCKET':
      console.log('created bucket', action.bucket);
      return state;
    case 'CREATE_BUCKET_ERROR':
      console.log('create bucket error', action.err);
      return state;
    case 'REORDER_BUCKETS':
      console.log('reorder buckets', action);
      // const newState = Object.assign({}, ...action.buckets);
      // console.log('newstate: ', newState)
      return state;
    case 'TOGGLE_LOCKED':
      console.log('lock toggled', action);
      return state;
    case 'TOGGLE_LOCKED_ERROR':
        console.log('toggle locked error', action);
        return state;
    case 'FILTER_BUCKET':
        console.log('bucket filter success');
        return state;
    case 'FILTER_BUCKET_ERROR':
        console.log('bucket filter error', action.err);
        return state;
    default:
      return state;
  }
}

export default bucketReducer;