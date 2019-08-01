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

const Bucket = ({moneybucket}) => {
  console.log('moneybucket', moneybucket);
  
  const classes = useStyles();
  return (
    <div className={classes.bucket}>
      <div className={classes.bucketInfo}>
        <h3>Money Bucket</h3>
      </div>
      {/* {moneybucket.currentValue && <h3 className={classes.bucketValue}>${moneybucket.currentValue}</h3>} */}
    </div>
  )
}

export default Bucket
