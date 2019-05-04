import React, { Component } from 'react';
import { Empty } from 'antd';
import _ from 'lodash';

import './VideoList.css';
import VideoCard from '../VideoCard/VideoCard';

export default class VideoList extends Component {
  render() {
    const { videoList } = this.props;
    return !_.isEmpty(videoList) ? (
      <div>
        <ul className="video-card-list">
          {videoList.map((value, index) => (
            <li className="video-card-list-item" key={value.videoType + index}>
              <VideoCard
                videoId={value.videoId}
                videoType={value.videoType}
                videoCover={value.videoCover}
                videoTitle={value.videoTitle}
              />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <Empty
        description="还没有视频 (°ー°〃)"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
}
