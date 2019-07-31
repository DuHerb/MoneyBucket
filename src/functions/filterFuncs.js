
export const testBuckets = [
  {
    uid: '1',
    name: 'bucketOne',
    targetValue: 100,
    currentValue: 50,
    filterType: 'static',
    isMinRequired: false,
    holdMinimum: null,
    isLocked: false,
    isPool: false,
    staticHoldValue: 100,
    percentHoldValue: 0,
    valueChange: 0,
  },
  {
    uid: '2',
    name: 'bucketTwo',
    targetValue: 2500,
    currentValue: 2400,
    filterType: 'static',
    isMinRequired: false,
    holdMinimum: null,
    isLocked: false,
    isPool: false,
    staticHoldValue: 2500,
    percentHoldValue: 0,
    valueChange: 0,
  },
  {
    uid: '3',
    name: 'bucketThree',
    targetValue: 350,
    currentValue: 0,
    filterType: 'percent',
    isMinRequired: false,
    holdMinimum: null,
    isLocked: false,
    isPool: false,
    staticHoldValue: 3,
    percentHoldValue: 10,
    valueChange: 0,
  }
]

export function mainBucketFilter(buckets, depositValue) {
  let batchArray = []
  let inputValue = depositValue;
  buckets.forEach(bucket => {
    const result = filterBucket(bucket, inputValue);
    if(result) {
      batchArray.push(result)
      //result[1] is the remainder of inputValue after passing through a bucketFilter
      inputValue = result[1]
      console.log('next input', inputValue);
    }
  })
      //need to return an object containing information needed to create a batch write to firestore.
      //need bucketUid, newCurrentValue for batch
      //need new output value to pass to next bucket
      //return leftOverValue to pool
      return [batchArray, inputValue];
    }

function filterBucket(bucket, inputValue) {
  if (bucket.isLocked || bucket.currentValue >= bucket.targetValue || inputValue === 0) {
    return null;
  } else {
    switch(bucket.filterType) {
      case 'static':
        return handleCase(bucket, inputValue, bucket.filterType)
      case 'percent':
        return handleCase(bucket, inputValue, bucket.filterType)
      default:
        console.log('filterType error');
    }
  }
  //need newCurrentValue, outPutValue, bucketUid
  // return { newCurrentValue: 0, outPutValue: 0};
}

function checkOverFlow(currentValue, targetValue, valueIncrease) {
  if(currentValue + valueIncrease >= targetValue)
    return true;
  else
    return false;
}

//TODO: add code to handle percent case isMinRequired = true
const handleCase = (bucket, inputValue, filterType) => {
  let holdValue = String;
  if(filterType === 'percent') {
    holdValue = +((bucket.percentHoldValue / 100) * inputValue).toFixed(2);
  } else {
    holdValue = bucket.staticHoldValue;
  }

  console.log(filterType, 'case', 'inputValue', inputValue, 'holdValue: ', holdValue, 'bucket current value', bucket.currentValue, 'bucket target', bucket.targetValue);

  if(holdValue < inputValue) {
    if(checkOverFlow(bucket.currentValue, bucket.targetValue, holdValue)) {
      //if holdValue pushes currentValue over the targetValue, set currentValue to targetValue
      // and return remainder of inputValue as array[1]
      return [
              {
                uid: bucket.uid,
                newCurrentValue: bucket.targetValue,
                valueChange: (bucket.targetValue - bucket.currentValue)
              },
              inputValue - (bucket.targetValue - bucket.currentValue)
            ]
    } else {
      //inputValue is greater than staticHoldValue. Add hold value to currentValue,
      // subtract holdValue from inputValue and return remainder as array[1]
      return [
              {
                uid: bucket.uid,
                newCurrentValue: holdValue + bucket.currentValue,
                valueChange: holdValue
              },
              (inputValue - holdValue)
            ]
    }
  } else {
    if(checkOverFlow(bucket.currentValue, bucket.targetValue, inputValue)) {
      //inputValue is less than hold value, but still pushes currentValue over targetValue
      //set currentValue to targetValue and return remainder as array[1]
      return [
        {
          uid: bucket.uid,
          newCurrentValue: bucket.targetValue,
          valueChange: (bucket.targetValue - bucket.currentValue)
        },
        inputValue - (bucket.targetValue - bucket.currentValue)
      ]
    } else {
      //inputValue is less than staticHoldValue and doesn't reach targetValue
      //add inputValue to currentValue and return 0 as array[1].
      return [
              {
                uid: bucket.uid,
                newCurrentValue: inputValue + bucket.currentValue,
                valueChange: inputValue
              },
              0
            ]
    }
  }
}