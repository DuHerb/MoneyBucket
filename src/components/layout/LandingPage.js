import React, { useEffect }from 'react'
import { testBuckets, mainBucketFilter } from '../../functions/filterFuncs';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'

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

const LandingPage = ({signOut, auth}) => {

  const classes = useStyles();

  // useEffect(() => {
  //   console.log('landing Page ', mainBucketFilter(testBuckets, 100));
  // })

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Welcome to Money Bucket</h2>
      <div className={classes.buttonGroup}>

      { auth.uid ?
        <Button variant="contained" className={`${classes.button} ${classes.signupButton}`} onClick={signOut}>
          Sign Out
        </Button>
        :
        <>
          <Link to='/login' style={{textDecoration: 'none'}}><Button variant="outlined" className={`${classes.button} ${classes.loginButton}`}>
            Log In
          </Button></Link>
          <Link to='/signup' style={{textDecoration: 'none'}}><Button variant="contained" className={`${classes.button} ${classes.signupButton}`}>
            Sign Up
          </Button></Link>
        </>
      }

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
