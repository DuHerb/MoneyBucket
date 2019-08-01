import React from 'react'
import { makeStyles } from '@material-ui/styles';
import BucketFillBar from './BucketFillBar';
import { Draggable } from 'react-beautiful-dnd'
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import { toggleIsLocked } from '../../store/actions/bucketActions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  bucket: {
    width: '90%',
    border: '1px solid black',
    margin: '5px auto',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  bucketLocked: {
    backgroundColor: 'lightgrey'
  },
  bucketInfo: {
    padding: 10
  },
  bucketValue: {
    alignSelf: 'center'
  }

})
//controls drag and drop animation speed.  look up beautiful-dnd docs for other animations changes
function getDropStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0
    transitionDuration: `0.2s`,
  };
}



const Bucket = ({bucket, index, toggleIsLocked}) => {
  const classes = useStyles();
  const onToggleIsLocked = () => {
    toggleIsLocked(bucket);
  }
  // console.log('from bucket', bucket, index);
  return (
    <Draggable draggableId={bucket.id} index={index} isDragDisabled={bucket.isDisabled}>
      {(provided, snapshot) =>(
        <div className={bucket.isLocked ? `${classes.bucket} ${classes.bucketLocked}` : `${classes.bucket}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getDropStyle(provided.draggableProps.style, snapshot)}
        >
          <div className={classes.bucketInfo}>
            <p>{bucket.id}</p>
            <p>{bucket.name}</p>
            <p>{bucket.order}</p>
            {bucket.isLocked === false ? <LockOpen className={classes.icon} onClick={onToggleIsLocked} /> : <Lock className={classes.icon} onClick={onToggleIsLocked} />}
          </div>
          <p className={classes.bucketValue}>{bucket.currentValue}</p>
          {/* <BucketFillBar /> */}
      </div>
      )}
    </Draggable>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleIsLocked: (bucket) => dispatch(toggleIsLocked(bucket))
  }
}

export default connect(null, mapDispatchToProps)(Bucket)

