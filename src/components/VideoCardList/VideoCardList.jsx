import React, { Component } from 'react';
import _ from 'lodash';

import VideoCard from '../VideoCard/VideoCard';

import './VideoCardList.css';
import { Empty } from 'antd';

export default class VideoCardList extends Component {
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
        description="没得视频看 (°ー°〃)"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
}
