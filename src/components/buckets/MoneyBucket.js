import React from 'react'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  bucket: {
    width: '90%',
    border: '1px solid black',
    margin: '5px auto',
    display: 'flex',
    justifyContent: 'space-between'
  },
  bucketInfo: {
    padding: 10
  },
  bucketValue: {
    alignSelf: 'center'
  }

})

const Bucket = () => {
  const classes = useStyles();
  return (
    <div className={classes.bucket}>
      <div className={classes.bucketInfo}>
        <p>Money Bucket</p>
      </div>
      <p className={classes.bucketValue}>Bucket $Value</p>
    </div>
  )
}

export default Bucket