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

const MainContainer = () => {
  const classes = useStyles();
  return (
    <div className={classes.bucketList}>
      <Bucket />
      <Bucket />
      <Bucket />
      <MoneyBucket />
    </div>
  )
}

export default MainContainer
