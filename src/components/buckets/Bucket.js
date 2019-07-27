import React from 'react'
import { makeStyles } from '@material-ui/styles';
import BucketFillBar from './BucketFillBar';
import { Draggable } from 'react-beautiful-dnd'

const useStyles = makeStyles({
  bucket: {
    width: '90%',
    border: '1px solid black',
    margin: '5px auto',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  bucketInfo: {
    padding: 10
  },
  bucketValue: {
    alignSelf: 'center'
  }

})

function getDropStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.2s`,
  };
}

const Bucket = ({item, index}) => {
  const classes = useStyles();
  // console.log('from bucket', item, index);
  
  return (
    <Draggable draggableId={item.id} index={index} isDragDisabled={item.isDisabled}>
      {(provided, snapshot) =>(
        <div className={classes.bucket}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getDropStyle(provided.draggableProps.style, snapshot)}
        >
          <div className={classes.bucketInfo}>
            <p>{item.name}</p>
            <p>Lock Status</p>
          </div>
          <p className={classes.bucketValue}>Bucket $Value</p>
          <BucketFillBar />
      </div>
      )}
    </Draggable>
  )
}

export default Bucket
