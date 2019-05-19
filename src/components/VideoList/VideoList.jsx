import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Empty, Icon, Dropdown, Menu } from 'antd';
import _ from 'lodash';

import './VideoList.css';

const { Item: MenuItem } = Menu;

export default class VideoList extends Component {
  static defaultProps = {
    videoList: [],
    hasAction: false,
    deleteVideo: () => {}
  };

  deleteVideoHandler = videoId => () => {
    const { deleteVideo } = this.props;
    deleteVideo(videoId);
  };

  render() {
    const { videoList, hasAction } = this.props;
    return !_.isEmpty(videoList) ? (
      <div>
        {videoList.map((value, index) => (
          <div className="video-list-item" key={`video${index}`}>
            <Link to={`/index/play/${value.videoId}`} target="_blank">
              {hasAction && (
                <Dropdown
                  className="video-item-action"
                  overlay={
                    <Menu onClick={this.deleteVideoHandler(value.videoId)}>
                      <MenuItem>删除</MenuItem>
                    </Menu>
                  }
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <Icon type="more" />
                </Dropdown>
              )}
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
          </div>
        ))}
      </div>
    ) : (
      <Empty
        description="没有视频 (°ー°〃)"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
}
