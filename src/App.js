import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Modal, message } from 'antd';
import Axios from 'axios';

import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import 'cropperjs/dist/cropper.css';
import './App.css';
import Login from './pages/User/Login/Login';
import Register from './pages/User/Register/Register';
import Index from './pages/Index/Index';
import Admin from './pages/Admin/Admin';

import appConfig from './config.js';

message.config({
  maxCount: 3
});

Axios.defaults.baseURL = appConfig.serverHost;
Axios.interceptors.request.use(
  config => {
    const tempConfig = config;
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      tempConfig.data = {
        ...config.data,
        userId
      };
    }
    console.log('requestConfig:', tempConfig);
    return tempConfig;
  },
  err => {
    console.error('requestErr:', err);
    return Promise.reject('Network Err');
  }
);
Axios.interceptors.response.use(
  res => {
    console.log('response:', res);
    const { statusCode, message } = res;
    if (statusCode !== '200') {
      console.log('statusCodeError:', message);
      return Promise.reject('Error');
    }
    return res;
  },
  err => {
    console.error('responseErr:', err);
    return Promise.reject('Network Err');
  }
);

export default class App extends Component {
  getConfirmation = (tips, callback) => {
    Modal.confirm({
      title: tips,
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
