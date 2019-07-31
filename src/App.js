import React from 'react';
import Navbar from './components/layout/Navbar';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './components/layout/LandingPage';
import User from './components/layout/User'
import CreateBucket from './components/buckets/CreateBucket';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path='/' component={LandingPage} />
          <Route  exact path='/user' component={User} />
          <Route path='/newBucket' component={CreateBucket} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

