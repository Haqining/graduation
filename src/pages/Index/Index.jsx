import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import NavBar from '../../components/NavBar/NavBar';
import Home from './Home/Home';
import Official from './Official/OfficialContainer';
import Talent from './Talent/TalentContainer';
import Play from './Play/Play';

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
        <Header className="header">
          <NavBar selectedKey={pathname.split('/')[2]} />
        </Header>
        <Content className="content">
          <Switch>
            <Route path={`${url}/home`} component={Home} />
            <Route path={`${url}/official`} component={Official} />
            <Route path={`${url}/talent`} component={Talent} />
            <Route path={`${url}/play/:contentId&&:videoType`} component={Play} />
            <Redirect from={`${url}/`} to={`${url}/home`} />
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}
