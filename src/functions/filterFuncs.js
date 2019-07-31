
export const testBuckets = [
  {
    uid: '1',
    name: 'bucketOne',
    targetValue: 100,
    currentValue: 0,
    filterType: 'static',
    isMinRequired: false,
    holdMinimum: null,
    isLocked: false,
    isPool: false,
    holdStatic: 1,
    holdPercent: 0
  },
  {
    uid: '2',
    name: 'bucketTwo',
    targetValue: 2500,
    currentValue: 0,
    filterType: 'static',
    isMinRequired: false,
    holdMinimum: null,
    isLocked: false,
    isPool: false,
    holdStatic: 2,
    holdPercent: 0
  },
  {
    uid: '3',
    name: 'bucketThree',
    targetValue: 350,
    currentValue: 0,
    filterType: 'static',
    isMinRequired: false,
    holdMinimum: null,
    isLocked: false,
    isPool: false,
    holdStatic: 3,
    holdPercent: 0
  }
]

export function mainBucketFilter(buckets, depositValue) {
  let batchArray = []
  let inputValue = depositValue;
  buckets.forEach(bucket => {
    const result = filterBucket(bucket, inputValue);
    if(result) {
      batchArray.push(result)
      inputValue = result[1]
      console.log(inputValue);
    }
  })
      //need to return an object containing information needed to create a batch write to firestore.
      //need bucketUid, newCurrentValue for batch
      //need new output value to pass to next bucket
      //return leftOverValue to pool
      return [batchArray, inputValue];
    }


export function filterBucket(bucket, inputValue) {
  if (bucket.isLocked || bucket.currentValue >= bucket.targetValue || inputValue === 0) {
    return null;
  } else {
    let holdValue = Number;
    let tempValue = Number;
    switch(bucket.filterType) {
      case 'static':
        holdValue = bucket.holdStatic;
        if(holdValue < inputValue) {
          return [{ uid: bucket.uid, newCurrentValue: holdValue + bucket.currentValue}, (inputValue - holdValue)]
        } else {
          return [{ uid: bucket.uid, newCurrentValue: inputValue + bucket.currentValue}, 0]
        }
      case 'percent':
        console.log('percent');
        break;
      default:
        console.log('filterType error');
    }


    return `${bucket.name} passed`
  }
  //need newCurrentValue, outPutValue, bucketUid
  // return { newCurrentValue: 0, outPutValue: 0};
}
