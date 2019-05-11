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
          <li className="video-list-item" key={`video${index}`}>
            <Link to={`/index/play/${value.videoId}`} target="_blank">
              <div
                className="video-item-image"
                style={{ backgroundImage: `url('${value.videoCover}')` }}
              />
              <div className="video-card-title" title={value.videoTitle}>
                {value.videoTitle}
              </div>
              <span className="play-icon">
                <Icon type="caret-right" />
              </span>
            </Link>
            {/* TODO:添加一个可操作列表 */}
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
