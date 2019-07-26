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
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

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

const Navbar = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  return (
    <Card className={classes.card}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div className={classes.login}>
              <Avatar aria-label="recipe" className={classes.avatar}>R</Avatar>
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
        <NavActions />
      </Collapse>
    </Card>
  )
}

export default Navbar
