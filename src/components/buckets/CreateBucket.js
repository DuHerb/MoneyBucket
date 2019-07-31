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

const CreateBucket = (props) => {
const classes = useStyles()
const [state, setState] = useState({
  filterType: 'static',
  isMinRequired: 'false',
})

const handleChange = name => (e) => {
  setState({...state, [name]: e.target.value })
}

const handleSubmit = (e) => {
  e.preventDefault();
  props.createBucket(state);
  console.log(state);
  // console.log(props.createBucket);
  props.history.push('/user');
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
            required
          />
          <TextField
            id="targetValue"
            label="Target Value"
            placeholder="How much money should this bucket collect?"
            onChange={handleChange('targetValue')}
            className={classes.textField}
            margin="normal"
            type='number'
            required
          />
          <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" style={{color: 'gray'}}>Filter Method</FormLabel>
          <RadioGroup
            aria-label="filterType"
            name="filterType"
            className={classes.group}
            value={state.filterType}
            onChange={handleChange('filterType')}
          >
          <FormControlLabel value='static' control={<Radio className={classes.radioButton} />} label="Flat Value" labelPlacement="bottom"/>
          <FormControlLabel value='percent' control={<Radio className={classes.radioButton} />} label="Percentage" labelPlacement="bottom"/>
        </RadioGroup>
      </FormControl>
      {state.filterType === 'static' ?
        <div id='staticOptions'>
          <TextField
            id="targetValue"
            label="Flat amount to be kept each deposit."
            placeholder="example: keep $10 of $500 = $10"
            onChange={handleChange('staticHoldValue')}
            className={classes.textField}
            margin="normal"
            type='number'
            required
            fullwidth='true'
          />
        </div> :
        <div id='percentOptions'>
          <TextField
            id="targetValue"
            label="Percentage of deposit to be kept each deposit"
            placeholder="example: keep 10% of $500 = $50"
            onChange={handleChange('targetValue')}
            className={classes.textField}
            margin="normal"
            type='number'
            required
            fullwidth='true'
          />
          <div className={classes.minReqControl}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" style={{color: 'gray'}}>Is there a Minimum Hold Amount?</FormLabel>
              <RadioGroup
                aria-label="minAmountReq"
                name="minAmountReq"
                className={classes.group}
                value={state.isMinRequired}
                onChange={handleChange('isMinRequired')}
              >
              <FormControlLabel value="false" control={<Radio className={classes.radioButton} />} label="no" labelPlacement="bottom"/>
              <FormControlLabel value="true" control={<Radio className={classes.radioButton} />} label="yes" labelPlacement="bottom"/>
              </RadioGroup>
            </FormControl>
          </div>
          {state.isMinRequired === 'true' ?
            <TextField
              id="minHoldValue"
              label="What is the Minimum amount to be held"
              placeholder="example: keep 10% of $80 = $10"
              onChange={handleChange('staticHoldValue')}
              className={classes.textField}
              margin="normal"
              type='number'
              required
              fullwidth='true'
            />
            : null
          }
        </div>
        }
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
