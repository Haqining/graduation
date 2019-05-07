import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import './Index.css';
import NavBar from '../../components/NavBar/NavBar';
import Home from './Home/Home';
import PersonalRoute from './Personal/PersonalRoute';
import Upload from './Upload/Upload';
import Auction from './Auction/Auction';
import Official from './Official/OfficialContainer';
import Talent from './Talent/TalentContainer';
import Play from './Play/Play';
import Article from './Article/Article';
import Read from './Read/Read';

const { Header, Content, Footer } = Layout;

export default class Index extends Component {
  render() {
    const {
      location: { pathname },
      match: { url }
    } = this.props;
    return (
      <Layout>
        <Header className="header">
          <NavBar selectedKey={pathname.split('/')[2]} />
        </Header>
        <Content className="content">
          <Switch>
            <Route path={`${url}/home`} component={Home} />
            <Route path={`${url}/personal`} component={PersonalRoute} />
            <Route path={`${url}/upload`} component={Upload} />
            <Route path={`${url}/auction`} component={Auction} />
            <Route path={`${url}/official`} component={Official} />
            <Route path={`${url}/talent`} component={Talent} />
            <Route path={`${url}/play/:videoId&&:videoType`} component={Play} />
            <Route path={`${url}/article`} component={Article} />
            <Route path={`${url}/read/:articleId`} component={Read} />
            <Redirect from={`${url}/`} to={`${url}/home`} />
          </Switch>
        </Content>
        <Footer style={{ minWidth: 1024 }}>Footer</Footer>
      </Layout>
    );
  }
}
