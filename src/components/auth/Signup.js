import React, { useState, useEffect }from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
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
  root: {
    display: 'flex',
  },
  formControl: {
    margin: 10,
    textAlign: 'center'
  },
  group: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  radioButton : {
    color: 'green !important'
  },
  textField: {
    width: '100%',
  },
  minReqControl: {
    display: 'flex',
    justifyContent: 'center'
  }
})


const Signup = ({auth}) => {
  const classes = useStyles();
  const [creds, setCreds] = useState();

  const handleChange = name => (e) => {
    setCreds({...creds, [name]: e.target.value })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('signIn', creds);
    
    // props.createBucket(state);
    // console.log(state);
    // console.log(props.createBucket);
    // props.history.push('/user');
  }
    if(auth.uid) return <Redirect to='/' />
    return (
      <>
        <h2 style={{textAlign: 'center'}}>Sign Up</h2>
        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
              id="firstName"
              label="firstName"
              placeholder="example: Bob"
              onChange={handleChange('firstName')}
              margin="normal"
              required
            />
            <TextField
              id="lastName"
              label="lastName"
              placeholder="example: Bob"
              onChange={handleChange('lastName')}
              margin="normal"
              required
            />
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
              onChange={handleChange('targetValue')}
              className={classes.textField}
              margin="normal"
              type='password'
              required
            />
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
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
  
  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     signIn: (creds) => dispatch(signIn(creds))
  //   }
  // }
  
  export default connect(mapStateToProps)(Signup)
