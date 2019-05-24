import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout, message } from 'antd';

import './Index.css';
import NavBar from '../../components/NavBar/NavBar';
import Home from './Home/HomeContainer';
import Search from './Search/Search';
import Message from './Message/Message';
import Personal from './Personal/PersonalContainer';
import PersonalSetting from './PersonalSetting/PersonalSettingContainer';
import Upload from './Upload/Upload';
import Auction from './Auction/Auction';
import Official from './Official/OfficialContainer';
// import Talent from './Talent/Talent';
import Play from './Play/PlayContainer';
import Article from './Article/ArticleContainer';
import Read from './Read/ReadContainer';

const { Header, Content, Footer } = Layout;

export default class Index extends Component {
  componentWillMount() {
    const { getVideo, getArticle, getUserInfo } = this.props;
    getVideo();
    getArticle();
    if (localStorage.getItem('userId')) {
      getUserInfo().catch(err => {
        message.error(err);
      });
    }
  }

  render() {
    const {
      location: { pathname },
      match: { url },
      userInfo
    } = this.props;
    return (
      <Layout>
        <Header className="header">
          <NavBar pathname={pathname} userInfo={userInfo} />
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
            {/* <Route path={`${url}/talent`} component={Talent} /> */}
            <Route path={`${url}/play/:videoId`} component={Play} />
            <Route path={`${url}/article`} component={Article} />
            <Route path={`${url}/read/:articleId`} component={Read} />
            <Redirect from={`${url}/`} to={`${url}/home`} />
          </Switch>
        </Content>
        <Footer style={{ minWidth: 1024, textAlign: 'center' }}>Footer</Footer>
      </Layout>
    );
  }
}
