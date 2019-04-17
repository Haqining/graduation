import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import User from './pages/User/User';
import Index from './pages/Index/Index';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/user" component={User} />
            <Route path="/index" component={Index} />
            <Redirect from="/" to="/index" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
