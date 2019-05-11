import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Layout, Menu, Empty, Icon, Dropdown, BackTop } from 'antd';
import _ from 'lodash';

import './Message.css';

const { Content, Sider } = Layout;
const { Item: MenuItem } = Menu;

export default class Message extends Component {
  state = {
    // comment like reply
    pageState: 'comment',
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
    ],
    likeList: [
      {
        id: 'testId',
        username: 'testUsername',
        time: '2018-01-01 20:20',
        videoId: 'testId',
        videoTitle: '相机界行家间的巅峰对决！华为P30 Pro PK 谷歌 Pixel 3XL'
      }
    ],
    replyList: [
      {
        id: 'testId',
        username: 'testUsername',
        time: '2018-01-01 20:20',
        replyContent: '假装这是一条回复',
        videoId: 'testId',
        videoTitle: '相机界行家间的巅峰对决！华为P30 Pro PK 谷歌 Pixel 3XL'
      }
    ]
  };

  selectMenuItem = ({ selectedKeys }) => {
    this.setState({
      pageState: selectedKeys[0]
    });
  };

  deleteComment = commentIndex => () => {
    const { commentList } = this.state;
    this.setState({
      commentList: commentList.filter((value, index) => index !== commentIndex)
    });
  };

  choosePage = pageState => {
    const { commentList, likeList, replyList } = this.state;
    const switchMap = new Map([
      [
        'comment',
        <div>
          {!_.isEmpty(commentList) ? (
            <div>
              {commentList.map((value, index) => (
                <Row className="message-list-item" key={`comment${index}`}>
                  <Row style={{ marginBottom: 8 }}>
                    <Link
                      className="avatar-username"
                      to={`/index/personal/${value.id}`}
                      style={{ marginRight: 32 }}
                    >
                      {value.username}
                    </Link>
                    <span style={{ color: '#c7c7c7' }}>{value.time}</span>
                  </Row>
                  <Row style={{ marginBottom: 8 }}>
                    评论了你的测评
                    {value.videoId ? (
                      <Link to={`/index/play/${value.videoId}`}>
                        {value.videoTitle}
                      </Link>
                    ) : (
                      <Link to={`/index/read/${value.articleId}`}>
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
                    <Icon className="message-menu" type="more" />
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
      ],
      [
        'like',
        <div>
          {!_.isEmpty(likeList) ? (
            <div>
              {likeList.map((value, index) => (
                <Row className="message-list-item" key={`like${index}`}>
                  <Row style={{ marginBottom: 8 }}>
                    <Link
                      className="avatar-username"
                      to={`/index/personal/${value.id}`}
                      style={{ marginRight: 32 }}
                    >
                      {value.username}
                    </Link>
                    <span style={{ color: '#c7c7c7' }}>{value.time}</span>
                  </Row>
                  <Row>
                    赞了你在
                    {value.videoId ? (
                      <Link to={`/index/play/${value.videoId}`}>
                        {value.videoTitle}
                      </Link>
                    ) : (
                      <Link to={`/index/read/${value.articleId}`}>
                        {value.articleTitle}
                      </Link>
                    )}
                    中的评论
                  </Row>
                </Row>
              ))}
            </div>
          ) : (
            <Empty
              description="暂时没有获得点赞"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      ],
      [
        'reply',
        <div>
          {!_.isEmpty(replyList) ? (
            <div>
              {replyList.map((value, index) => (
                <Row className="message-list-item" key={`like${index}`}>
                  <Row style={{ marginBottom: 8 }}>
                    <Link
                      className="avatar-username"
                      to={`/index/personal/${value.id}`}
                      style={{ marginRight: 32 }}
                    >
                      {value.username}
                    </Link>
                    <span style={{ color: '#c7c7c7' }}>{value.time}</span>
                  </Row>
                  <Row style={{ marginBottom: 8 }}>
                    回复了你在
                    {value.videoId ? (
                      <Link to={`/index/play/${value.videoId}`}>
                        {value.videoTitle}
                      </Link>
                    ) : (
                      <Link to={`/index/read/${value.articleId}`}>
                        {value.articleTitle}
                      </Link>
                    )}
                    中的评论
                  </Row>
                  <Row>{value.replyContent}</Row>
                </Row>
              ))}
            </div>
          ) : (
            <Empty
              description="暂时没有回复"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      ]
    ]);
    return switchMap.get(pageState);
  };

  render() {
    const { pageState } = this.state;
    const userId = localStorage.getItem('userId');
    return (
      <div className="section">
        <div className="section-content">
          <Row style={{ marginBottom: 24 }}>
            <Link to={`/index/personal/${userId}`}>
              <Icon type="left" />
              返回个人中心
            </Link>
          </Row>
          <Layout className="message-main-content">
            <Sider width={200} style={{ background: '#ffffff' }}>
              <Menu
                selectedKeys={[pageState]}
                onSelect={this.selectMenuItem}
                style={{ height: '100%' }}
              >
                <MenuItem key="comment">评论</MenuItem>
                <MenuItem key="like">点赞</MenuItem>
                <MenuItem key="reply">回复</MenuItem>
              </Menu>
            </Sider>
            <Content className="message-content">
              {this.choosePage(pageState)}
            </Content>
          </Layout>
          <BackTop visibilityHeight={0}>
            <div className="ant-back-top-inner">UP</div>
          </BackTop>
        </div>
      </div>
    );
  }
}
