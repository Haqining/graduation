import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Row, Icon, Popover, Divider, Avatar, Dropdown } from 'antd';
import _ from 'lodash';

import './NavBar.css';
import wxCode from '../../assets/小程序码.jpg';

const { Item: MenuItem } = Menu;

export default class NavBar extends Component {
  logout = () => {
    localStorage.setItem('userId', '');
  };

  render() {
    const {
      pathname,
      userInfo: { avatar, username }
    } = this.props;
    const selectedKey = pathname.split('/')[2];
    // TODO:替换成普通id
    const userId = localStorage.getItem('userId');
    const isLogin = !!userId;
    console.log()
    const isAdmin = userId === "1";
    return (
      <Row className="nav-bar" type="flex" justify="space-between">
        <div>
          <div className="nav-logo" />
          <Menu mode="horizontal" theme="dark" selectedKeys={[selectedKey]}>
            <MenuItem key="home" className="nav-menu-item">
              <Link to="/index/home">首页</Link>
            </MenuItem>
            <MenuItem key="official" className="nav-menu-item">
              <Link to="/index/official">测评视频</Link>
            </MenuItem>
            {/* <MenuItem key="talent" className="nav-menu-item">
              <Link to="/index/talent">达人频道</Link>
            </MenuItem> */}
            <MenuItem key="article" className="nav-menu-item">
              <Link to="/index/article">测评文章</Link>
            </MenuItem>
          </Menu>
        </div>
        <Row className="nav-right" type="flex">
          <span>
            <Link to="/index/search">
              <Icon type="search" style={{ marginRight: 8 }} />
              搜索
            </Link>
          </span>
          <Popover
            placement="bottomRight"
            arrowPointAtCenter
            content={
              <img src={wxCode} alt="小程序码" style={{ width: '100%' }} />
            }
            overlayStyle={{ width: 200 }}
          >
            <Icon type="wechat" style={{ marginRight: 8 }} />
            小程序
          </Popover>
          <span>
            {isLogin ? (
              <Row type="flex" align="middle">
                <Link
                  to="/index/message"
                  target="_blank"
                  style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                >
                  通知
                </Link>
                <Divider type="vertical" />
                {/* <Link className="nav-action" to="#">
                  私信
                </Link>
                <Divider type="vertical" /> */}
                <Dropdown
                  overlay={
                    <Menu>
                      <MenuItem>
                        <Link to={`/index/personal/${userId}`} target="_blank">
                          {username}
                        </Link>
                      </MenuItem>
                      {isAdmin && (
                        <MenuItem>
                          <Link to="/admin" target="_blank">
                            管理员入口
                          </Link>
                        </MenuItem>
                      )}
                      <MenuItem>
                        <Link to="#" onClick={this.logout}>
                          退出
                        </Link>
                      </MenuItem>
                    </Menu>
                  }
                  placement="bottomRight"
                >
                  <Link to={`/index/personal/${userId}`} target="_blank">
                    <Avatar
                      src={avatar}
                      icon="user"
                      style={{ cursor: 'pointer' }}
                    />
                  </Link>
                </Dropdown>
              </Row>
            ) : (
              <span>
                <Link className="nav-action" to="/register">
                  注册
                </Link>
                <Divider type="vertical" />
                <Link
                  className="nav-action"
                  to="/login"
                  onClick={() => {
                    sessionStorage.setItem('backPath', pathname);
                  }}
                >
                  登录
                </Link>
              </span>
            )}
          </span>
        </Row>
      </Row>
    );
  }
}
