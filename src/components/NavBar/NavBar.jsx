import React, { Component } from 'react';
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
    <Menu.Item>testUserName</Menu.Item>
    <Menu.Item>
      <span>退出</span>
    </Menu.Item>
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
              首页
            </MenuItem>
            <MenuItem key="official" className="nav-menu-item">
              官方视频
            </MenuItem>
            <MenuItem key="talent" className="nav-menu-item">
              用户视频
            </MenuItem>
            <MenuItem key="article" className="nav-menu-item">
              评测文章
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
                <a className="nav-action" href="#1">
                  注册
                </a>
                <Divider type="vertical" />
                <a className="nav-action" href="#1">
                  登录
                </a>
              </span>
            ) : (
              <Row type="flex" align="middle">
                <a className="nav-action" href="#1">
                  通知
                </a>
                <Divider type="vertical" />
                <a className="nav-action" href="#1">
                  私信
                </a>
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
