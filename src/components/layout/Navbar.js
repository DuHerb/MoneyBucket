import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import NavActions from './NavActions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    justifyContent: 'space-between'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: green[500],
  },
  root: {
    flexGrow: 1,
    borderRadius: 0
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  appBar: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 0
  },
  login: {
    color: 'black',
    display: 'flex'
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  console.log('nav props:', props);
  

  function handleExpandClick() {
    setExpanded(!expanded);
    // console.log(props);
  }
  return (
    <Card className={classes.card}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div className={classes.login}>
            <Link to='/' style={{textDecoration: 'none'}}><Avatar aria-label="recipe" className={classes.avatar}>R</Avatar></Link>
              {/* <Button color="inherit">Login</Button> */}
            </div>
            <Typography variant="h6" className={classes.title}>
              MoneyBucket
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              >
              <MenuIcon />
          </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <NavActions location={props.location.pathname}/>
      </Collapse>
    </Card>
  )
}

const mapStateToProps = (state) => {
  console.log('navbar state: ', state);
  return {
    test: 'test prop'
  }
}
export default withRouter(connect(mapStateToProps)(Navbar))

// export default withRouter(Navbar)
