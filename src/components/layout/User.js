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
import { Redirect } from 'react-router-dom'


const User = (state) => {
  // const counter = state.buckets.length()
  // console.log("user state.buckets ", state)
  // const[localState, setlocalState] = useState()
  if(!state.auth.uid) return <Redirect to='/' />

  // useEffect(() => {
    // console.log('useEffect', state.buckets)
    // const localState = state.buckets;
    // console.log('localstate:', localState)

    // setlocalState(state.buckets)
    // console.log(' preset localState', localState);
    // const firestore = getFirestore();
    // let localArray = []
    // firestore.collection('buckets').get().then(response => {
    //   console.log(response);
    //   response.forEach(doc => {
    //     localArray.push(doc.data())
    //   })
    //   console.log('localAray', localArray);
    //   console.log('localState', localState);
    // });
    // setlocalState(localArray);
  // })


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
    // <p>test -- looking for store from firebase</p>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    reorderBuckets: (newOrder) => dispatch(reorderBuckets(newOrder))
  }
}

const mapStateToProps = (state) => {
  // console.log('state w/ firestore ', state);
  return {
    // dummy data
    // buckets: state.bucket.buckets
    // buckets: state.bucket.initState.buckets
    // firestore data
    auth: state.firebase.auth,
    buckets: state.firestore.ordered.buckets
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'buckets', where: ['name', '==', 'm'], orderBy: ['order']}
  ])
)(User)
