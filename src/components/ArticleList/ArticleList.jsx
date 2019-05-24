import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Empty, Avatar, Icon, Dropdown, Menu } from 'antd';
import _ from 'lodash';
import moment from 'moment';

import './ArticleList.css';
import ContentType from '../../ContentType';

const { Item: MenuItem } = Menu;

export default class ArticleList extends Component {
  static defaultProps = {
    articleList: [],
    hasAction: false,
    deleteArticle: () => {}
  };

  deleteArticleHandler = videoId => () => {
    const { deleteArticle } = this.props;
    deleteArticle(videoId);
  };

  render() {
    const { articleList, hasAction } = this.props;
    return !_.isEmpty(articleList) ? (
      <div>
        {articleList.map((value, index) => (
          <div className="article-list-item" key={`article${index}`}>
            <Link to={`/index/read/${value.articleId}`} target="_blank">
              <Row
                type="flex"
                justify="space-between"
                style={{ marginBottom: 8 }}
              >
                <span className="article-item-title">{value.articleTitle}</span>
                <span style={{ color: '#c7c7c7' }}>
                  {moment(value.time).format('YYYY-MM-DD HH:mm')}
                </span>
              </Row>
              <Row type="flex">
                <span className="article-item-introduction">
                  {value.articleIntroduction}
                </span>
                <span style={{ width: 200 }}>
                  <img
                    src={value.articleCover}
                    alt="cover"
                    style={{ width: '100%' }}
                  />
                </span>
              </Row>
            </Link>
            <Row
              className="article-item-info"
              type="flex"
              align="middle"
              style={{ userSelect: 'none' }}
            >
              {/* <span>
                <Link
                  className="avatar-username"
                  to={`/index/personal/${value.id}`}
                  target="_blank"
                >
                  <Avatar
                    src={value.avatar}
                    icon="user"
                    style={{ marginRight: 8 }}
                  />
                  <span>{value.username}</span>
                </Link>
              </span> */}
              <span>{ContentType[value.contentType]}</span>
              {/* <span>评论({value.comments})</span> */}
            </Row>
            {/* TODO:加一个可操作列表 */}
            {hasAction && (
              <Dropdown
                className="article-item-action"
                overlay={
                  <Menu onClick={this.deleteArticleHandler(value.articleId)}>
                    <MenuItem>删除</MenuItem>
                  </Menu>
                }
                placement="bottomRight"
                trigger={['click']}
              >
                <Icon type="more" />
              </Dropdown>
            )}
          </div>
        ))}
      </div>
    ) : (
      <Empty
        description="没有文章 (￣ ‘i ￣;)"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
}
