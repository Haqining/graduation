import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import NavBar from '../../components/NavBar/NavBar';
import Home from './Home/Home';

import './Index.css';

const { Header, Content, Footer } = Layout;

export default class Index extends Component {
  render() {
    const {
      match: { url },
      location: { pathname }
    } = this.props;
    return (
      <Layout>
        <Header>
          <NavBar selectedKey={pathname.split('/')[2]} />
        </Header>
        <Content>
          <Switch>
            <Route path={`${url}/home`} component={Home} />
            <Redirect from={`${url}/`} to={`${url}/home`} />
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}
