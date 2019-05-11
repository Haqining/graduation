import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Menu, Empty, Icon, Dropdown } from 'antd';
import _ from 'lodash';

import './ManageComment.css';

const { Item: MenuItem } = Menu;

export default class ManageComment extends Component {
  state = {
    commentList: [
      {
        id: 'testId',
        username: 'testUsername',
        time: '2018-01-01 20:20',
        commentContent: '假装这是一条评论',
        videoId: 'testId',
        videoTitle: '相机界行家间的巅峰对决！华为P30 Pro PK 谷歌 Pixel 3XL'
      },
      {
        id: 'testId',
        username: 'testUsername',
        time: '2018-01-01 20:20',
        commentContent: '假装这是一条评论',
        articleId: 'testId',
        articleTitle: '相机界行家间的巅峰对决！华为P30 Pro PK 谷歌 Pixel 3XL'
      }
    ]
  };

  deleteComment = commentIndex => () => {
    const { commentList } = this.state;
    this.setState({
      commentList: commentList.filter((value, index) => index !== commentIndex)
    });
  };

  render() {
    const { commentList } = this.state;
    return (
      <div>
        {!_.isEmpty(commentList) ? (
          <div>
            {commentList.map((value, index) => (
              <Row className="mc-list-item" key={`comment${index}`}>
                <Row style={{ marginBottom: 8 }}>
                  <Link
                    className="avatar-username"
                    to={`/index/personal/${value.id}`}
                    target="_blank"
                    style={{ marginRight: 32 }}
                  >
                    {value.username}
                  </Link>
                  <span style={{ color: '#c7c7c7' }}>{value.time}</span>
                </Row>
                <Row style={{ marginBottom: 8 }}>
                  评论了
                  {value.videoId ? (
                    <Link to={`/index/play/${value.videoId}`} target="_blank">
                      {value.videoTitle}
                    </Link>
                  ) : (
                    <Link to={`/index/read/${value.articleId}`} target="_blank">
                      {value.articleTitle}
                    </Link>
                  )}
                </Row>
                <Row>{value.commentContent}</Row>
                <Dropdown
                  overlay={
                    <Menu onClick={this.deleteComment(index)}>
                      <MenuItem>删除</MenuItem>
                    </Menu>
                  }
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <Icon className="mc-menu" type="more" />
                </Dropdown>
              </Row>
            ))}
          </div>
        ) : (
          <Empty
            description="暂时没有评论 "
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    );
  }
}
