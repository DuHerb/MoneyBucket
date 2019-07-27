import React, {useState} from 'react';
import Navbar from './components/layout/Navbar';
import MainContainer from './components/layout/MainContainer';
import { dndInit } from './store/dndInit';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  console.log('from reorder function', list);
  
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed)

  return result;
}

function App() {

  const [dnd, setDnd] = useState(dndInit)

  function onDragEnd(result) {
    console.log(result);
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
  console.log("app", dnd);
  return (
    <div className="App">
      <Navbar/>
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps} >
              <MainContainer buckets={dnd}/>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;

