import React, { useState, useEffect } from 'react'
import MainContainer from './../layout/MainContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import MoneyBucket from './../buckets/MoneyBucket';
// import { reorder } from './../../functions/dndFuncs';
import { connect } from 'react-redux';
import {firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { reorderBuckets, reorderArray } from '../../store/actions/bucketActions'
import { reduxFirestore,getFirestore } from 'redux-firestore';

const User = (state) => {
  // const counter = state.buckets.length()
  console.log("user state.buckets ", state)

  useEffect(() => {
    const testArray = []
    const db = getFirestore();

    const test = db.collection('buckets').where('name', '==', 'm').orderBy('order').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        testArray.push(doc.data())
        console.log('updated testArray', testArray);
        
      })
    }).catch((err) => {
      console.log('error getting test docs', err);
    })

    console.log('use effect', test);
    
  })



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

  }
  return (

    <DragDropContext onDragEnd={onDragEnd}>
      <>
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
        </>
      </DragDropContext>
    // <p>test -- looking for store from firebase</p>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    reorderBuckets: (newOrder) => dispatch(reorderBuckets(newOrder))
  }
}

const mapStateToProps = (state) => {
  console.log('inside map ', state);
  // const test = state.firestore.ordered.buckets.filter(item => item.order === 0)
  return {
    // dummy data
    // buckets: state.bucket.buckets
    // buckets: state.bucket.initState.buckets
    // firestore data
    buckets: state.firestore.ordered.buckets
    // buckets: test
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'buckets', where: ['name', '==', 'm'], orderBy: ['order']}
  ])
)(User)
