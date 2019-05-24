import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Avatar, Tooltip, Tag, Button, Popconfirm, message } from 'antd';
import _ from 'lodash';

import './ManageUser.css';
import UserData from './UserData';
import AddressData from './AddressData';

const { Column } = Table;

export default class ManageUser extends Component {
  state = {
    userList: []
  };

  componentWillMount() {
    this.getUserHandler();
  }

  getUserHandler = () => {
    const { getUser } = this.props;
    getUser()
      .then(res => {
        const {
          data: { data }
        } = res;
        this.setState({
          userList: data.map(value => ({
            key: value.id,
            userId: value.id,
            username: value.username,
            status: value.state
          }))
        });
      })
      .catch(err => {
        message.error(err);
      });
  };

  formatHometown = hometown => {
    const pca = hometown.split(',');
    const province = _.find(AddressData, value => value.value === pca[0]);
    const city = _.find(province.children, value => value.value === pca[1]);
    const area = _.find(city.children, value => value.value === pca[2]);
    return `${province.label} ${city.label} ${area.label}`;
  };

  chooseStatus = status => {
    const switchMap = new Map([
      // [1, <Tag>正常</Tag>],
      [2, <Tag color="red">禁用</Tag>]
    ]);
    return switchMap.get(status);
  };

  changeStatus = record => () => {
    const { userList } = this.state;
    const { userId, username } = record;
    const selected = _.find(userList, value => value.userId === userId);
    if (selected.status === 0) {
      this.lockAccountHandler(username);
    } else {
      this.unlockAccountHandler(username);
    }
  };

  lockAccountHandler = username => {
    const { lockAccount } = this.props;
    const formData = new FormData();
    formData.append('username', username);
    lockAccount(formData)
      .then(res => {
        message.success('修改成功');
        this.getUserHandler();
      })
      .catch(err => {
        message.error(err);
      });
  };

  unlockAccountHandler = username => {
    const { unlockAccount } = this.props;
    const formData = new FormData();
    formData.append('username', username);
    unlockAccount(formData)
      .then(res => {
        message.success('修改成功');
        this.getUserHandler();
      })
      .catch(err => {
        message.error(err);
      });
  };

  render() {
    const { userList } = this.state;
    return (
      <div>
        <Table
          dataSource={userList}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 10
          }}
        >
          <Column title="ID" dataIndex="userId" align="center" />
          {/* <Column
            title="头像"
            dataIndex="avatar"
            align="center"
            render={text => <Avatar src={text} icon="user" />}
          /> */}
          <Column
            title="用户名"
            dataIndex="username"
            align="center"
            render={(text, record) => (
              <Link
                className="avatar-username"
                target="_blank"
                to={`/index/personal/${record.id}`}
              >
                {text}
              </Link>
            )}
          />
          {/* <Column title="性别" dataIndex="sex" align="center" />
          <Column
            title="简介"
            dataIndex="introduction"
            align="center"
            render={text => (
              <Tooltip title={text} placement="bottom">
                <div className="admin-long-text">{text}</div>
              </Tooltip>
            )}
          />
          <Column
            title="家乡"
            dataIndex="hometown"
            align="center"
            render={text => this.formatHometown(text)}
          />
          <Column title="生日" dataIndex="birthday" align="center" /> */}
          <Column
            title="用户状态"
            dataIndex="status"
            align="center"
            render={text => this.chooseStatus(text)}
          />
          <Column
            render={record => (
              <Popconfirm
                title="将改变该用户的状态"
                onConfirm={this.changeStatus(record)}
              >
                <Button>修改状态</Button>
              </Popconfirm>
            )}
          />
        </Table>
      </div>
    );
  }
}
