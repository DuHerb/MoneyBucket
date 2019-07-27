import React from 'react'
import { useState } from 'react'
import MainContainer from './../layout/MainContainer';
import { dndInit } from './../../store/dndInit';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import MoneyBucket from './../buckets/MoneyBucket';
import { reorder } from './../../functions/dndFuncs';

const User = () => {
  const [dnd, setDnd] = useState(dndInit)

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if(result.destination.index === result.source.index) {
      return;
    }

    const newOrder = reorder(
      dnd,
      result.source.index,
      result.destination.index
    );
    setDnd(newOrder)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
            <div>
              a logged in user should go here.  for now, it will be the main bucket container
            </div>
            <Droppable droppableId='list'>
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps} >
                  <MainContainer buckets={dnd}/>
                  {provided.placeholder}
                  <MoneyBucket />
                </div>
              )}
            </Droppable>
          </DragDropContext>
  )
}

export default User
