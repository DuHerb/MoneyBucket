import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles({
  root: {
    padding: 20,
    display: 'flex',
    justifyContent: 'space-around'
  },
  navButton: {
    backgroundColor: green[500],
    color: 'white'
  }
})

const NavActions = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined" className={[classes.button, classes.navButton]}>Make Deposit</Button>
      <Button variant="outlined" className={[classes.button, classes.navButton]}>New Bucket</Button>
    </div>
  )
}

export default NavActions