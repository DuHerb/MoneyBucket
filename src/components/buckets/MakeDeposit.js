import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { green } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom';
import { makeDeposit } from '../../store/actions/bucketActions'

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

const MakeDeposit = (props) => {
  const classes = useStyles();

  const [depositValue, setDespositValue] = useState(0);

  const handleChange = (e) => {
    setDespositValue(+e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('depositValue:', depositValue);
    console.log('makedeposit state: ', props);
    props.makeDeposit(depositValue)
    props.history.push('/user')
  }


  if(!props.auth.uid) return <Redirect to='/' />
  return (
    <>
      <h2 style={{textAlign: 'center'}}>Make Deposit</h2>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            id="depositValue"
            label="Deposit Value"
            placeholder="example: $500"
            onChange={handleChange}
            margin="normal"
            type='number'
            required
          />
        <Button variant="contained" className={classes.submitLogin} onClick={handleSubmit}>Submit</Button>
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeDeposit: (value) => dispatch(makeDeposit(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeDeposit)
//TODO: Add options to deposit directly into a single bucket, casecading down from there?
