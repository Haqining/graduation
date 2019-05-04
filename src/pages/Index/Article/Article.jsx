import React, { Component } from 'react';
import { Row, Button, BackTop } from 'antd';

import './Article.css';
import ArticleList from '../../../components/ArticleList/ArticleList';
import ArticleData from '../ArticleData';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: ArticleData,
      hasMore: true
    };
  }

  showMore = () => {
    const { articleList } = this.state;
    this.setState({
      articleList: [...articleList, ...ArticleData],
      hasMore: articleList.length < 30
    });
  };

  changeArticleLike = e => {
    const { articleList } = this.state;
    const selectArticle = articleList[e];
    if (selectArticle.liked) {
      selectArticle.like -= 1;
    } else {
      selectArticle.like += 1;
    }
    selectArticle.liked = !selectArticle.liked;
    articleList[e] = { ...selectArticle };
    this.setState({
      articleList
    });
  };

  render() {
    const {
      history: { push }
    } = this.props;
    const { articleList, hasMore } = this.state;
    return (
      <div>
        <Row className="section">
          <div className="section-content">
            <Row>
              <ArticleList
                articleList={articleList}
                push={push}
                onArticleLikeChange={this.changeArticleLike}
              />
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
        </Row>
        <BackTop visibilityHeight={0}>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}
