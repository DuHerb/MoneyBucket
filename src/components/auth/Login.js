import React, { useState }from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions'
import { green } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: 10,
    textAlign: 'center'
  },
  textField: {
    width: '100%',
  },
  submitLogin: {
    width: 200,
    backgroundColor: green[500],
    color: 'white',
    margin: '0 auto'
  }
})

const Login = ({signIn, authError, auth}) => {
  const classes = useStyles();
  const [creds, setCreds] = useState();

  const handleChange = name => (e) => {
    setCreds({...creds, [name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(creds);
    // props.createBucket(state);
    // console.log(state);
    // console.log(props.createBucket);
    // props.history.push('/user');
  }
  if(auth.uid) return <Redirect to='/' />
  return (
    <>
      <h2 style={{textAlign: 'center'}}>Log In</h2>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            placeholder="example: money@bucket.com"
            onChange={handleChange('email')}
            margin="normal"
            type='email'
            required
          />
          <TextField
            id="password"
            label="Password"
            placeholder="example: ********"
            onChange={handleChange('password')}
            className={classes.textField}
            margin="normal"
            type='password'
            required
          />
        <Button variant="contained" className={classes.submitLogin} onClick={handleSubmit}>Submit</Button>
        <div style={{textAlign: 'center', color: 'red'}}>
          {authError ? <p>{authError}</p> : null}
        </div>
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
