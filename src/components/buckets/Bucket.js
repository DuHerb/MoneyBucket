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
//controls drag and drop animation speed.
//look up beautiful-dnd docs for other animations changes
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
            <p>Name: {bucket.name}</p>
            <p>UID: {bucket.id}</p>
            <p>Index: {bucket.order}</p>
            {bucket.isLocked === false ? <LockOpen className={classes.icon} onClick={onToggleIsLocked} /> : <Lock className={classes.icon} onClick={onToggleIsLocked} />}
          </div>
          {(bucket.targetValue === bucket.currentValue) ?
            <h2 style={{fontWeight: 'bold', color: 'green'}}>Full</h2>
              :
            <div>
              <p>Target Value: ${bucket.targetValue}</p>
              <p className={classes.bucketValue}>Current Value: ${bucket.currentValue}</p>
              {bucket.valueChange && <p>Value Change: ${bucket.valueChange}</p>}
              {bucket.staticHoldValue && <p>Hold Value($): {bucket.staticHoldValue}</p>}
              {bucket.percentHoldValue && <p>Hold Value(%): {bucket.percentHoldValue}</p>}
              {bucket.minHoldValue && <p>Min Value($): {bucket.minHoldValue}</p>}
            </div>
          }
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

