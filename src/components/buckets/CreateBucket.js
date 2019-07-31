import React from 'react'
import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
import { createBucket } from '../../store/actions/bucketActions'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: 10,
  },
  group: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
})

const CreateBucket = (props) => {
const classes = useStyles()
const [state, setState] = useState({
  name: '',
  targetValue:'',
  filterType: 'static'
})

const handleChange = name => (e) => {
  setState({...state, [name]: e.target.value })
}

const handleSubmit = (e) => {
  e.preventDefault();
  // props.createBucket(state);
  console.log(state);
  // console.log(props.createBucket);
  // props.history.push('/');
}

  return (
    <>
      <h2>Create New Bucket</h2>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Bucket Name"
          placeholder="What are you saving for?"
          onChange={handleChange('name')}
          margin="normal"
        />
        <TextField
        id="targetValue"
        label="Target Value"
        placeholder="How much money should this bucket collect?"
        onChange={handleChange('targetValue')}
        className={classes.textField}
        margin="normal"
      />
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Filter Type</FormLabel>
        <RadioGroup
          aria-label="filterType"
          name="filterType"
          className={classes.group}
          value={state.filterType}
          onChange={handleChange('filterType')}
        >
          <FormControlLabel value="static" control={<Radio />} label="Flat Value" labelPlacement="bottom"/>
          <FormControlLabel value="percent" control={<Radio />} label="Percentage" labelPlacement="bottom"/>
        </RadioGroup>
      </FormControl>
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
