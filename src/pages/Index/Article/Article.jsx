import React, { Component } from 'react';
import { Row, Button, BackTop } from 'antd';

import './Article.css';
import ArticleList from '../../../components/ArticleList/ArticleList';
import ArticleData from '../ArticleData';

export default class Article extends Component {
  state = {
    articleList: ArticleData,
    hasMore: true
  };

  showMore = () => {
    const { articleList } = this.state;
    this.setState({
      articleList: [...articleList, ...ArticleData],
      hasMore: articleList.length < 30
    });
  };

  render() {
    const { articleList, hasMore } = this.state;
    return (
      <div>
        <div className="section">
          <div className="section-content">
            <Row>
              <ArticleList articleList={articleList} />
            </Row>
            <Row type="flex" justify="center">
              {hasMore ? (
                <Button
                  type="primary"
                  size="large"
                  onClick={this.showMore}
                  style={{ padding: '0 40px' }}
                >
                  显示更多
                </Button>
              ) : (
                <span>没有更多了ε=ε=ε=(~￣▽￣)~</span>
              )}
            </Row>
          </div>
        </div>
        <BackTop visibilityHeight={0}>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}
