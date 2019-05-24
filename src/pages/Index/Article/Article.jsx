import React, { Component } from 'react';
import { Row, Button, BackTop } from 'antd';
import _ from 'lodash';

import './Article.css';
import ArticleList from '../../../components/ArticleList/ArticleList';
import ArticleData from '../ArticleData';

export default class Article extends Component {
  state = {
    listLength: 0,
    currentLength: 3,
    hasMore: true
  };

  componentWillMount() {
    const { articleList } = this.props;
    const { currentLength } = this.state;
    const listLength = articleList.length;
    const hasMore = listLength > currentLength;
    this.setState({
      listLength,
      currentLength: listLength > currentLength ? currentLength : listLength,
      hasMore
    });
  }
  showMore = () => {
    const { listLength, currentLength } = this.state;
    const nextLength = currentLength + 6;
    this.setState({
      currentLength: nextLength,
      hasMore: nextLength < listLength
    });
  };

  render() {
    const { articleList } = this.props;
    const { hasMore } = this.state;
    const hasData = !_.isEmpty(articleList);
    return (
      <div>
        <div className="section">
          <div className="section-content">
            <Row>
              <ArticleList articleList={articleList} />
            </Row>
            {hasData && (
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
            )}
          </div>
        </div>
        <BackTop visibilityHeight={0}>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}
