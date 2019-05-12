import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Empty, Row, Avatar, Divider } from 'antd';
import _ from 'lodash';

import './UserList.css';

export default class UserList extends Component {
  render() {
    const { userList } = this.props;
    return !_.isEmpty(userList) ? (
      <div>
        {userList.map((value, index) => (
          <Link
            className="user-list-item"
            key={`user${index}`}
            to={`/index/personal/${value.id}`}
            target="_blank"
          >
            <Row type="flex" align="middle">
              <Avatar
                src={value.avatar}
                icon="user"
                size={48}
                style={{ marginRight: 24 }}
              />
              <div style={{ flex: 1 }}>
                <Row className="user-username" style={{ marginBottom: 8 }}>
                  {value.username}
                </Row>
                <Row>{value.introduction}</Row>
              </div>
              <div>
                <span>投稿视频：{value.videoSubmission}</span>
                <Divider type="vertical" />
                <span>投稿文章：{value.articleSubmission}</span>
                <Divider type="vertical" />
                <span>累计点赞：{value.accumulatedPraise}</span>
              </div>
            </Row>
          </Link>
        ))}
      </div>
    ) : (
      <Empty
        description="没有视频 (°ー°〃)"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
}
