import React from 'react'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  fillBar: {
    width: 40,
    height: '100%',
    backgroundColor: 'green'
  }
})

const BucketFillBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.fillBar}></div>
  )
}

export default BucketFillBar
