/* eslint-disable no-restricted-globals */
/* eslint-disable no-native-reassign */
import React from 'react'
import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
import { createBucket } from '../../store/actions/bucketActions'

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  }
})

const CreateBucket = ({createBucket}) => {
const classes = useStyles()
const [state, setState] = useState({
  id: '',
  name: '',
  isDisabled: false
})

const handleChange = name => (e) => {
  setState({...state, [name]: e.target.value })
}

  const handleSubmit = (e) => {
    e.preventDefault();
    createBucket(state);
  }

  return (
    <>
      <h2>Create New Bucket</h2>
      <p>this is a place holder form for testing</p>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="BucketName"
          onChange={handleChange('name')}
          margin="normal"
        />
        <TextField
          id="uid"
          label="UID"
          onChange={handleChange('id')}
          margin="normal"
        />
        <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </form>
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBucket: (bucket) => dispatch(createBucket(bucket))
  }
}

export default connect(null, mapDispatchToProps)(CreateBucket)