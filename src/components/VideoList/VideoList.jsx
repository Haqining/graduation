import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Empty, Icon } from 'antd';
import _ from 'lodash';

import './VideoList.css';

export default class VideoList extends Component {
  render() {
    const { videoList } = this.props;
    return !_.isEmpty(videoList) ? (
      <ul className="video-list">
        {videoList.map((value, index) => (
          <li className="video-list-item" key={value.videoType + index}>
            <div className="video-card">
              <Link to={`/index/play/${value.videoId}&&${value.videoType}`}>
                <img src={value.videoCover} alt={value.videoTitle} />
                <div className="video-card-title" title={value.videoTitle}>
                  {value.videoTitle}
                </div>
                <span className="play-icon">
                  <Icon type="caret-right" />
                </span>
              </Link>
              {/* TODO:添加一个可操作列表 */}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <Empty
        description="没有视频 (°ー°〃)"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
}
