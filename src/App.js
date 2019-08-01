import React from 'react';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './components/layout/LandingPage';
import User from './components/layout/User'
import CreateBucket from './components/buckets/CreateBucket';
import MakeDeposit from './components/buckets/MakeDeposit';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/user' component={User} />
          <Route path='/createbucket' component={CreateBucket} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/deposit' component={MakeDeposit} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

