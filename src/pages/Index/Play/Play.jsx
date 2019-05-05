import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Breadcrumb, Icon, BackTop } from 'antd';
import ReactPlayer from 'react-player';

import CommentList from '../../../components/CommentList/CommentList';

import './Play.css';
import { ContentTypeDictionary } from '../../../config.js';
import VideoInfo from './VideoInfo';

const { Item: BreadcrumbItem } = Breadcrumb;

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInfo: VideoInfo,
      isPlay: false,
      isFirstClick: true
    };
  }

  chooseVideoType = videoType => {
    const isOfficial = videoType === 'official';
    return (
      <Link to={isOfficial ? '/index/official' : '/index/talent'}>
        {isOfficial ? '官方频道' : '达人频道'}
      </Link>
    );
  };

  playVideo = () => {
    this.setState({
      isPlay: true,
      isFirstClick: false
    });
  };

  pauseVideo = () => {
    this.setState({
      isPlay: false
    });
  };

  render() {
    const {
      match: {
        params: { videoId, videoType }
      }
    } = this.props;
    const {
      videoInfo: {
        videoTitle,
        contentType,
        videoUrl,
        videoCover,
        videoIntroduction
      },
      isPlay,
      isFirstClick
    } = this.state;
    return (
      <Row>
        <Row className="section play-content">
          <div className="section-content">
            <Breadcrumb className="play-breadcrumb">
              <BreadcrumbItem>{this.chooseVideoType(videoType)}</BreadcrumbItem>
              <BreadcrumbItem>
                {ContentTypeDictionary[contentType]}
              </BreadcrumbItem>
              <BreadcrumbItem>{videoTitle}</BreadcrumbItem>
            </Breadcrumb>
            <Row className="play-title">{videoTitle}</Row>
            <Row
              style={{
                marginBottom: 16
              }}
            >
              <ReactPlayer
                url={videoUrl}
                width={'unset'}
                height={'unset'}
                controls={true}
                playing={isPlay}
                onPlay={this.playVideo}
                onPause={this.pauseVideo}
              />
              {!isPlay && isFirstClick ? (
                <div>
                  <div
                    className="play-video-wrapper"
                    onClick={this.playVideo}
                    style={{ backgroundImage: `url(${videoCover})` }}
                  />
                </div>
              ) : null}
              {isPlay ? null : (
                <div className="play-video-icon" onClick={this.playVideo}>
                  <Icon type="caret-right" />
                </div>
              )}
            </Row>
            <Row>
              <Row className="play-introduction-title">视频介绍</Row>
              <Row>{videoIntroduction}</Row>
            </Row>
          </div>
        </Row>
        <Row className="section play-comment-content">
          <div className="section-content ">
            <Row className="play-editor-content">
              <CommentList contentId={videoId} />
            </Row>
          </div>
        </Row>
        <BackTop visibilityHeight={0}>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </Row>
    );
  }
}
