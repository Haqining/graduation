import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import './VideoCard.css';

export default class VideoCard extends Component {
  render() {
    const { videoId, videoType, videoCover, videoTitle } = this.props;
    return (
      <div className="video-card">
        <Link to={`/index/play/${videoId}&&${videoType}`}>
          <img src={videoCover} alt={videoTitle} />
          <span className="video-card-title" title={videoTitle}>
            {videoTitle}
          </span>
          <span className="play-icon">
            <Icon type="caret-right" />
          </span>
        </Link>
      </div>
    );
  }
}
