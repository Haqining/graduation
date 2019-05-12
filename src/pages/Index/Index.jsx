import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import './Index.css';
import NavBar from '../../components/NavBar/NavBar';
import Home from './Home/Home';
import Search from './Search/Search';
import Message from './Message/Message';
import Personal from './Personal/Personal';
import PersonalSetting from './PersonalSetting/PersonalSetting';
import Upload from './Upload/Upload';
import Auction from './Auction/Auction';
import Official from './Official/Official';
import Talent from './Talent/Talent';
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
          <NavBar pathname={pathname} />
        </Header>
        <Content className="content">
          <Switch>
            <Route path={`${url}/home`} component={Home} />
            <Route path={`${url}/search`} component={Search} />
            <Route path={`${url}/message`} component={Message} />
            <Route path={`${url}/personal/:id`} component={Personal} />
            <Route
              path={`${url}/personal-setting`}
              component={PersonalSetting}
            />
            <Route path={`${url}/upload`} component={Upload} />
            <Route path={`${url}/auction`} component={Auction} />
            <Route path={`${url}/official`} component={Official} />
            <Route path={`${url}/talent`} component={Talent} />
            <Route path={`${url}/play/:videoId`} component={Play} />
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
