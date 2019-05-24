import React, { Component } from 'react';
import { Row, Button, BackTop } from 'antd';
import _ from 'lodash';

import './Official.css';
import OfficialData from '../OfficialData';
import VideoList from '../../../components/VideoList/VideoList';

export default class Official extends Component {
  state = {
    listLength: 0,
    currentLength: 6,
    hasMore: true
  };

  componentWillMount() {
    const { videoList } = this.props;
    const { currentLength } = this.state;
    const hasMore = videoList.length > currentLength;
    this.setState({
      listLength: videoList.length,
      currentLength:
        videoList.length > currentLength ? currentLength : videoList.length,
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
    const { videoList } = this.props;
    const { currentLength, hasMore } = this.state;
    const hasData = !_.isEmpty(videoList);
    return (
      <div>
        <div className="section">
          <div className="section-content">
            <Row>
              <VideoList
                videoList={videoList.filter(
                  (value, index) => index < currentLength
                )}
              />
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
