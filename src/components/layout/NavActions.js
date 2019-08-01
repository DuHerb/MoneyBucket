import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import {Link} from 'react-router-dom'


const useStyles = makeStyles({
  root: {
    padding: 20,
    display: 'flex',
    justifyContent: 'space-around',
  },
  navButton: {
    backgroundColor: green[500],
    color: 'white'
  }
})

const NavActions = ({location}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {location !== '/user' ?
        <Link to='/user' style={{textDecoration: 'none'}}><Button variant="outlined" className={`${classes.button} ${classes.navButton}`}>Your Buckets</Button></Link>
        :
        null
      }
      {(location !== '/deposit' && location !== '/' && location !== '/createbucket') &&
        <Link to='/deposit' style={{textDecoration: 'none'}}><Button variant="outlined" className={`${classes.button} ${classes.navButton}`}>Make Deposit</Button></Link>
      }
      {(location !== '/createbucket' && location !== '/deposit') &&
        <Link to='/createbucket' style={{textDecoration: 'none'}}><Button variant="outlined" className={`${classes.button} ${classes.navButton}`}>New Bucket</Button></Link>
      }
    </div>
  )
}

export default NavActions