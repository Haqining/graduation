import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Empty, Avatar } from 'antd';
import _ from 'lodash';

import './ArticleList.css';
import { ContentTypeDictionary } from '../../config.js';

export default class ArticleList extends Component {
  render() {
    const { articleList } = this.props;
    return !_.isEmpty(articleList) ? (
      <div>
        {articleList.map((value, index) => (
          <Link
            className="article-list-item"
            to={`/index/read/${value.articleId}`}
            key={value.contentType + index}
          >
            <Row
              type="flex"
              justify="space-between"
              style={{ marginBottom: 8 }}
            >
              <span className="article-item-title">{value.articleTitle}</span>
              <span style={{ color: '#c7c7c7' }}>{value.time}</span>
            </Row>
            <Row type="flex" style={{ marginBottom: 8 }}>
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
            <Row
              className="article-item-info"
              type="flex"
              align="middle"
              style={{ userSelect: 'none' }}
            >
              <span>
                <Avatar
                  src={value.avatar}
                  icon="user"
                  style={{ marginRight: 8 }}
                />
                <span>{value.username}</span>
              </span>
              <span>{ContentTypeDictionary[value.contentType]}</span>
              <span style={{ color: value.liked ? '#ed1c24' : '' }}>
                {value.liked ? '已赞' : '点赞'}({value.like})
              </span>
              <span>评论({value.comments})</span>
              {/* TODO:加一个可操作列表 */}
            </Row>
          </Link>
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
