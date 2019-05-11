import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Row, Layout, Menu, Icon } from 'antd';

import './Admin.css';
import ReviewVideo from './ReviewVideo/ReviewVideo';
import ReviewArticle from './ReviewArticle/ReviewArticle';
import ManageUser from './ManageUser/ManageUser';
import ManageComment from './ManageComment/ManageComment';
import ShelfProducts from './ShelfProducts/ShelfProducts';
import StoredProducts from './StoredProducts/StoredProducts';
import ManageBanner from './ManageBanner/ManageBanner';

const { Content, Sider } = Layout;
const { Item: MenuItem } = Menu;

export default class Admin extends Component {
  render() {
    const {
      location: { pathname },
      match: { url }
    } = this.props;
    return (
      <div className="section">
        <div className="section-content">
          <Row style={{ marginBottom: 24 }}>
            <Link to={'/index/home'}>
              <Icon type="left" />
              返回主页
            </Link>
          </Row>
          <Layout className="admin-content">
            <Sider width={200} style={{ background: '#ffffff' }}>
              <Menu
                selectedKeys={[pathname.split('/')[2]]}
                style={{ height: '100%' }}
              >
                <MenuItem key="review-video">
                  <Link to="/admin/review-video">视频审核</Link>
                </MenuItem>
                <MenuItem key="review-article">
                  <Link to="/admin/review-article">文章审核</Link>
                </MenuItem>
                <MenuItem key="manage-user">
                  <Link to="/admin/manage-user">用户管理</Link>
                </MenuItem>
                <MenuItem key="manage-comment">
                  <Link to="/admin/manage-comment">评论管理</Link>
                </MenuItem>
                <MenuItem key="shelf-products">
                  <Link to="/admin/shelf-products">上架产品</Link>
                </MenuItem>
                <MenuItem key="stored-products">
                  <Link to="/admin/stored-products">已上架产品</Link>
                </MenuItem>
                <MenuItem key="manage-banner">
                  <Link to="/admin/manage-banner">首页展示内容</Link>
                </MenuItem>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px' }}>
              <Switch>
                <Route path={`${url}/review-video`} component={ReviewVideo} />
                <Route
                  path={`${url}/review-article`}
                  component={ReviewArticle}
                />
                <Route path={`${url}/manage-user`} component={ManageUser} />
                <Route
                  path={`${url}/manage-comment`}
                  component={ManageComment}
                />
                <Route
                  path={`${url}/shelf-products`}
                  component={ShelfProducts}
                />
                <Route
                  path={`${url}/stored-products`}
                  component={StoredProducts}
                />
                <Route path={`${url}/manage-banner`} component={ManageBanner} />
                <Redirect from={`${url}/`} to={`${url}/review-video`} />
              </Switch>
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}
