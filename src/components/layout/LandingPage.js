import React, { useEffect }from 'react'
import { testBuckets, mainBucketFilter } from '../../functions/filterFuncs';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  signupButton: {
    backgroundColor: green[500],
    color: 'white',
    margin: 10,
    width: 200
  },
  loginButton: {
    backgroundColor: 'white',
    color: green[500],
    margin: 10,
    width: 200
  }
})
const LandingPage = () => {

  const classes = useStyles();

  useEffect(() => {
    console.log('landing Page ', mainBucketFilter(testBuckets, 100));
  })

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Welcome to Money Buckets</h2>
      <div className={classes.buttonGroup}>
      <Link to='/login' style={{textDecoration: 'none'}}><Button variant="outlined" className={`${classes.button} ${classes.loginButton}`}>
        Log In
      </Button></Link>
      <Link to='/signup' style={{textDecoration: 'none'}}><Button variant="contained" className={`${classes.button} ${classes.signupButton}`}>
        Sign Up
      </Button></Link>
      <Link to='/' style={{textDecoration: 'none'}}><Button variant="contained" className={`${classes.button} ${classes.signupButton}`}>
        Sign Out
      </Button></Link>
      </div>
    </div>
  )
}

export default LandingPage
