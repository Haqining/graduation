import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Row,
  Input,
  Icon,
  // Popover,
  Divider,
  Avatar,
  Dropdown,
  message
} from 'antd';

import './NavBar.css';
// import wxCode from '../../assets/小程序码.jpg';

const { Item: MenuItem } = Menu;

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  logout = () => {
    console.log('logout');
  };

  changeKeyword = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      keyword: value
    });
  };

  confirmSearch = () => {
    message.info('按了回车');
  };

  render() {
    const { selectedKey } = this.props;
    const { keyword } = this.state;
    const isLogin = localStorage.getItem('userId') !== '';
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
              <Link to="/index/article">测评文章</Link>
            </MenuItem>
          </Menu>
        </div>
        <Row className="nav-right" type="flex">
          <span className="nav-search-input">
            <Input
              value={keyword}
              placeholder="搜索"
              prefix={<Icon className="nav-search-icon" type="search" />}
              onChange={this.changeKeyword}
              onPressEnter={this.confirmSearch}
            />
          </span>
          {/* <span>
            <Popover
              className="nav-wx"
              placement="bottomRight"
              arrowPointAtCenter
              content={<img src={wxCode} alt="小程序码" />}
            >
              <Icon type="wechat" style={{ marginRight: 8 }} />
              小程序
            </Popover>
          </span> */}
          <span>
            {isLogin ? (
              <Row type="flex" align="middle">
                <Link className="nav-action" to="#">
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
                        <Link to="/index/personal">testUserName</Link>
                      </MenuItem>
                      <MenuItem>
                        <div onClick={this.logout}>退出</div>
                      </MenuItem>
                    </Menu>
                  }
                  placement="bottomRight"
                >
                  <Link to="/index/personal">
                    <Avatar icon="user" style={{ cursor: 'pointer' }} />
                  </Link>
                </Dropdown>
              </Row>
            ) : (
              <span>
                <Link className="nav-action" to="/register">
                  注册
                </Link>
                <Divider type="vertical" />
                <Link className="nav-action" to="/login">
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
