import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Row,
  Input,
  Icon,
  Popover,
  Divider,
  Avatar,
  Dropdown
} from 'antd';

import './NavBar.css';
import wxCode from '../../assets/小程序码.jpg';

const { Item: MenuItem } = Menu;

const dropMenu = (
  <Menu>
    <MenuItem>testUserName</MenuItem>
    <MenuItem>
      <span>退出</span>
    </MenuItem>
  </Menu>
);

export default class NavBar extends Component {
  render() {
    const { selectedKey } = this.props;
    const isLogin = localStorage.getItem('token') !== '';
    return (
      <Row className="nav-bar" type="flex" justify="space-between">
        <div>
          <div className="nav-logo" />
          <Menu mode="horizontal" theme="dark" selectedKeys={[selectedKey]}>
            <MenuItem key="home" className="nav-menu-item">
              <Link to="/index/home">首页</Link>
            </MenuItem>
            <MenuItem key="official" className="nav-menu-item">
              <Link to="/index/official">官方频道</Link>
            </MenuItem>
            <MenuItem key="talent" className="nav-menu-item">
              <Link to="/index/talent">达人频道</Link>
            </MenuItem>
            <MenuItem key="article" className="nav-menu-item">
              <Link to="/index/article">文章频道</Link>
            </MenuItem>
          </Menu>
        </div>
        <Row className="nav-right" type="flex">
          <span className="nav-search-input">
            <Input
              placeholder="Search"
              prefix={<Icon className="nav-search-icon" type="search" />}
            />
          </span>
          <span>
            <Popover
              className="nav-wx"
              placement="bottomRight"
              arrowPointAtCenter
              content={<img src={wxCode} alt="小程序码" />}
            >
              <Icon type="wechat" style={{ marginRight: 8 }} />
              小程序
            </Popover>
          </span>
          <span>
            {isLogin ? (
              <span>
                <Link className="nav-action" to="#">
                  注册
                </Link>
                <Divider type="vertical" />
                <Link className="nav-action" to="#">
                  登录
                </Link>
              </span>
            ) : (
              <Row type="flex" align="middle">
                <Link className="nav-action" to="#">
                  通知
                </Link>
                <Divider type="vertical" />
                <Link className="nav-action" to="#">
                  私信
                </Link>
                <Divider type="vertical" />
                <Dropdown overlay={dropMenu} placement="bottomRight">
                  <Avatar icon="user" />
                </Dropdown>
              </Row>
            )}
          </span>
        </Row>
      </Row>
    );
  }
}
