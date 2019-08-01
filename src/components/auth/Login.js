import React, { useState }from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions'


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


const Login = ({signIn, authError}) => {
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
        <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        <div style={{textAlign: 'center', color: 'red'}}>{authError ? <p>{authError}</p> : null}</div>
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
