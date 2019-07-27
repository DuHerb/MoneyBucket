import React from 'react'
import Bucket from '../buckets/Bucket';
import { makeStyles } from '@material-ui/styles';
import MoneyBucket from './MoneyBucket'


const useStyles = makeStyles({
  bucketList: {
    display: 'flex',
    flexDirection: 'column',
  }
})

const MainContainer = ({buckets}) => {
  const classes = useStyles();
  console.log('main', buckets);

  return (
    <>
    <div className={classes.bucketList}>
      {buckets && buckets.map((item, index )=> {
        return (
          <Bucket item={item} key={item.id} index={index} />
        )
      })}
    </div>
    <MoneyBucket />
    </>
  )
}

export default MainContainer
