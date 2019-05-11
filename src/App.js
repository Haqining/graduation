import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Modal } from 'antd';

import Login from './pages/User/Login/Login';
import Register from './pages/User/Register/Register';
import Index from './pages/Index/Index';
import Admin from './pages/Admin/Admin';

import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import 'cropperjs/dist/cropper.css';
import './App.css';

export default class App extends Component {
  getConfirmation = (message, callback) => {
    Modal.confirm({
      title: message,
      centered: true,
      onOk() {
        callback(true);
      },
      onCancel() {
        callback(false);
      }
    });
  };

  render() {
    return (
      <BrowserRouter getUserConfirmation={this.getConfirmation}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/index" component={Index} />
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/index" />
        </Switch>
      </BrowserRouter>
    );
  }
}
