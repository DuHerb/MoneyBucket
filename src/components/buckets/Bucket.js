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
    justifyContent: 'space-between'
  },
  bucketInfo: {
    padding: 10
  },
  bucketValue: {
    alignSelf: 'center'
  }

})

const Bucket = ({item, index}) => {
  const classes = useStyles();
  console.log('from bucket', item, index);
  
  return (
    <Draggable draggableId={item.id} index={index}>
      {provided =>(
        <div className={classes.bucket}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={classes.bucketInfo}>
            <p>Bucket Name</p>
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
