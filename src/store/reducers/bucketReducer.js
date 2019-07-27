
const initState = {
  buckets: [
    {id: '1', name: 'bucket 1', isDisabled: false},
    {id: '2', name: 'bucket 2', isDisabled: false},
    {id: '3', name: 'bucket 3', isDisabled: false},
  ]
}

const bucketReducer = (state = initState, action) => {
  switch(action.type) {
    case 'CREATE_BUCKET':
      console.log('created bucket', action.bucket);
      return state;
    default:
      return state;
  }
}

export default bucketReducer;