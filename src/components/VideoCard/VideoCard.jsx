import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import './VideoCard.css';

export default class VideoCard extends Component {
  render() {
    const { imgSrc, title, videoId } = this.props;
    return (
      <div className="video-card">
        <Link to={`/play/${videoId}`}>
          <img src={imgSrc} alt={title} />
          <span className="video-card-title" title={title}>
            {title}
          </span>
          <span className="play-icon">
            <Icon type="caret-right" />
          </span>
        </Link>
      </div>
    );
  }
}
