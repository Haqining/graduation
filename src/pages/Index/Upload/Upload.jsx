import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Row, Layout, Menu, Icon } from 'antd';

import './Upload.css';
import UploadArticle from './UploadArticle/UploadArticle';
import UploadVideo from './UploadVideo/UploadVideo';

const { Content, Sider } = Layout;
const { Item: MenuItem } = Menu;

export default class Upload extends Component {
  render() {
    const {
      location: { pathname },
      match: { url }
    } = this.props;
    return (
      <Row className="section">
        <div className="section-content">
          <Row style={{ marginBottom: 24 }}>
            <Link to="/index/personal">
              <Icon type="left" />
              返回个人中心
            </Link>
          </Row>
          <Layout className="upload-content">
            <Sider width={200} style={{ background: '#ffffff' }}>
              <Menu
                selectedKeys={[pathname.split('/')[3]]}
                style={{ height: '100%' }}
              >
                <MenuItem key="video">
                  <Link to="/index/upload/video">视频投稿</Link>
                </MenuItem>
                <MenuItem key="article">
                  <Link to="/index/upload/article">文章投稿</Link>
                </MenuItem>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px' }}>
              <Switch>
                <Route path={`${url}/video`} component={UploadVideo} />
                <Route path={`${url}/article`} component={UploadArticle} />
              </Switch>
            </Content>
          </Layout>
        </div>
      </Row>
    );
  }
}
