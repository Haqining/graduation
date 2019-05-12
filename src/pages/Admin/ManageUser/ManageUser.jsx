import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Avatar, Tooltip, Tag, Button, Popconfirm } from 'antd';
import _ from 'lodash';

import './ManageUser.css';
import UserData from './UserData';
import AddressData from './AddressData';

const { Column } = Table;

export default class ManageUser extends Component {
  state = {
    userList: UserData
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
      ['normal', <Tag>正常</Tag>],
      ['disable', <Tag color="red">禁用</Tag>]
    ]);
    return switchMap.get(status);
  };

  changeStatus = record => () => {
    const { userList } = this.state;
    const { key } = record;
    const selectIndex = _.findIndex(userList, value => value.key === key);
    if (userList[selectIndex].status === 'normal') {
      userList[selectIndex].status = 'disable';
    } else {
      userList[selectIndex].status = 'normal';
    }
    this.setState({
      userList
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
          <Column
            title="头像"
            dataIndex="avatar"
            align="center"
            render={text => <Avatar src={text} icon="user" />}
          />
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
          <Column title="性别" dataIndex="sex" align="center" />
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
          <Column title="生日" dataIndex="birthday" align="center" />
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
                placement="topLeft"
                arrowPointAtCenter
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
