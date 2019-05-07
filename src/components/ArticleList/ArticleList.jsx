import React, { Component } from 'react';
import { Row, Empty, Avatar } from 'antd';
import _ from 'lodash';

import './ArticleList.css';
import { ContentTypeDictionary } from '../../config.js';

export default class ArticleList extends Component {
  clickArticleItem = articleId => () => {
    const { push } = this.props;
    push('/index/read/' + articleId);
  };

  changeArticleLike = index => e => {
    // 防止冒泡
    e.stopPropagation();
    console.log(index);
    const { onArticleLikeChange } = this.props;
    onArticleLikeChange(index);
  };

  render() {
    const { articleList } = this.props;
    return !_.isEmpty(articleList) ? (
      <div>
        {articleList.map((value, index) => (
          <Row
            className="article-list-item"
            key={value.contentType + index}
            onClick={this.clickArticleItem(value.articleId)}
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
              <span style={{ width: 240 }}>
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
              <span
                onClick={this.changeArticleLike(index)}
                style={{ color: value.liked ? '#ed1c24' : '' }}
              >
                {value.liked ? '已赞' : '点赞'}({value.like})
              </span>
              <span>评论({value.comments})</span>
              {/* TODO:加一个可操作列表 */}
            </Row>
          </Row>
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
