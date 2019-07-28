import React from 'react'
import MainContainer from './../layout/MainContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import MoneyBucket from './../buckets/MoneyBucket';
import { reorder } from './../../functions/dndFuncs';
import { connect } from 'react-redux';
import {firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'

const User = (state) => {
  // const [dnd, setDnd] = useState(dndInit)
  console.log("user",state)
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if(result.destination.index === result.source.index) {
      return;
    }

    const newOrder = reorder(
      state.buckets,
      result.source.index,
      result.destination.index
    );
    // setDnd(newOrder)
    // console.log("ondragend", newOrder)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
            <div>
              a logged in user should go here.  for now, it will be the main bucket container
            </div>
            <Droppable droppableId='list'>
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} >
                  <MainContainer buckets={state.buckets}/>
                  {provided.placeholder}
                  <MoneyBucket />
                </div>
              )}
            </Droppable>
          </DragDropContext>
    // <p>test -- looking for store from firebase</p>
  )
}

const mapStateToProps = (state) => {
  // console.log('state w/ firestore ', state);
  return {
    // dummy data
    // buckets: state.bucket.buckets
    // firestore data
    buckets: state.firestore.ordered.buckets
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'buckets'}
  ])
)(User)
