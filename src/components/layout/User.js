import React from 'react'
import MainContainer from './../layout/MainContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import MoneyBucket from './../buckets/MoneyBucket';
import { connect } from 'react-redux';
import {firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { reorderBuckets, reorderArray } from '../../store/actions/bucketActions'
import { Redirect } from 'react-router-dom'

const User = (state) => {

  if(!state.auth.uid) return <Redirect to='/' />

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if(result.destination.index === result.source.index) {
      return;
    }

    const newOrder = reorderArray(
      state.buckets,
      result.source.index,
      result.destination.index
    );
    console.log("ondragend", newOrder)
    state.reorderBuckets(newOrder)
    console.log(state.redux);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <>
        <Droppable droppableId='list'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps} >
              <MainContainer buckets={state.buckets}/>
              {provided.placeholder}
              <MoneyBucket />
            </div>
          )}
        </Droppable>
        </>
      </DragDropContext>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    reorderBuckets: (newOrder) => dispatch(reorderBuckets(newOrder))
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    buckets: state.firestore.ordered.buckets
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect( props => [
    { collection: 'buckets', where: ['userId', '==', props.auth.uid], orderBy: ['order']}
  ])
)(User)
