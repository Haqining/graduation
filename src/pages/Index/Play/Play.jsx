import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Breadcrumb, Icon, BackTop, Avatar } from 'antd';
import ReactPlayer from 'react-player';

import CommentList from '../../../components/CommentList/CommentList';

import './Play.css';
import { ContentTypeDictionary } from '../../../config.js';
import VideoInfo from './VideoInfo';

const { Item: BreadcrumbItem } = Breadcrumb;

export default class Play extends Component {
  state = {
    videoInfo: VideoInfo,
    isPlay: false,
    isFirstClick: true
  };

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
        params: { videoId }
      }
    } = this.props;
    const {
      videoInfo: {
        id,
        avatar,
        username,
        time,
        comments,
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
      <div>
        <div className="section play-content">
          <div className="section-content">
            <Breadcrumb className="content-breadcrumb">
              {/* <BreadcrumbItem>{this.chooseVideoType(videoType)}</BreadcrumbItem> */}
              <BreadcrumbItem>
                {ContentTypeDictionary[contentType]}
              </BreadcrumbItem>
              <BreadcrumbItem>{videoTitle}</BreadcrumbItem>
            </Breadcrumb>
            <Row className="content-title">{videoTitle}</Row>
            <Row className="content-info" type="flex" align="middle">
              <span>
                <Link className="avatar-username" to={`/index/personal/${id}`}>
                  <Avatar src={avatar} icon="user" style={{ marginRight: 8 }} />
                  <span>{username}</span>
                </Link>
              </span>
              <span>评论({comments})</span>
              <span>{time}</span>
            </Row>
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
        </div>
        <div className="section play-comment-content">
          <div className="section-content ">
            <Row className="play-editor-content">
              <CommentList contentId={videoId} />
            </Row>
          </div>
        </div>
        <BackTop visibilityHeight={0}>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}
