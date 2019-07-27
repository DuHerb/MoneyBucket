import React, {useState} from 'react';
import Navbar from './components/layout/Navbar';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './components/layout/LandingPage';
import User from './components/layout/User'

function App() {

  
  // console.log("app", dnd);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/user" component={User} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

