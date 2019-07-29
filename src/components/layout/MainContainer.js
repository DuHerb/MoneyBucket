import React, { useState } from 'react'
import Bucket from '../buckets/Bucket';
import { makeStyles } from '@material-ui/styles';
// import MoneyBucket from '../buckets/MoneyBucket'


const useStyles = makeStyles({
  bucketList: {
    display: 'flex',
    flexDirection: 'column',
  }
})

const MainContainer = ({buckets}) => {
  const classes = useStyles();
  console.log('main', buckets);
  // const ordered = (buckets =>{
  //   const newBuckets = buckets;
  //   newBuckets.sort((a,b) => (a.order > b.order) ? 1 : -1)
  //   return newBuckets
  // })

  // const bucketList = ordered(buckets)

  return (
    <>
    <div className={classes.bucketList}>
      {buckets && buckets.map((item, index )=> {
        return (
          <Bucket item={item} key={item.id} index={index} />
        )
      })}
    </div>
    </>
  )
}

export default MainContainer
