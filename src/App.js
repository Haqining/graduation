import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from './pages/User/Login/Login';
import Register from './pages/User/Register/Register';
import Index from './pages/Index/Index';

import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import 'cropperjs/dist/cropper.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/index" component={Index} />
          <Redirect from="/" to="/index" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
