import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Breadcrumb, Icon, BackTop, Avatar, Spin, message } from 'antd';
import ReactPlayer from 'react-player';
import moment from 'moment';

import CommentList from '../../../components/CommentList/CommentListContainer';

import './Play.css';
import ContentType from '../../../ContentType.js';
import VideoData from './VideoData';

const { Item: BreadcrumbItem } = Breadcrumb;

export default class Play extends Component {
  state = {
    loading: false,
    videoData: {},
    commentList: [],
    isPlay: false,
    isFirstClick: true
  };

  componentWillMount() {
    const {
      match: {
        params: { videoId }
      },
      getVideoById
    } = this.props;
    getVideoById({ id: videoId })
      .then(res => {
        const {
          data: { data }
        } = res;
        this.setState({
          videoData: {
            userId: data.userId,
            videoId: data.id,
            time: moment(data.createTime).format('YYYY-MM-DD HH:mm'),
            videoTitle: data.title,
            contentType: data.type.id,
            videoUrl: `http://${data.videoUrl}`,
            videoCover: data.headPictureUrl,
            videoIntroduction: data.introduction
          }
        });
      })
      .catch(err => {
        message.error(err);
      });
  }

  chooseVideoType = videoType => {
    const isOfficial = videoType === 'official';
    return (
      <Link to={isOfficial ? '/index/official' : '/index/talent'}>
        {isOfficial ? '官方视频' : '达人频道'}
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
      loading,
      videoData: {
        userId,
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
            <Spin spinning={loading}>
              <Breadcrumb className="content-breadcrumb">
                {/* <BreadcrumbItem>{this.chooseVideoType(videoType)}</BreadcrumbItem> */}
                <BreadcrumbItem>
                  <Link to="/index/official">测评视频</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>{ContentType[contentType]}</BreadcrumbItem>
                <BreadcrumbItem>{videoTitle}</BreadcrumbItem>
              </Breadcrumb>
              <Row className="content-title">{videoTitle}</Row>
              <Row className="content-info" type="flex" align="middle">
                <span>
                  <Link
                    className="avatar-username"
                    to={`/index/personal/${userId}`}
                    target="_blank"
                  >
                    {/* <Avatar
                      src={avatar}
                      icon="user"
                      style={{ marginRight: 8 }}
                    /> */}
                    <span>{userId}</span>
                  </Link>
                </span>
                {/* <span>评论({comments})</span> */}
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
                {!isPlay && isFirstClick && (
                  <div>
                    <div
                      className="play-video-wrapper"
                      onClick={this.playVideo}
                      style={{ backgroundImage: `url(${videoCover})` }}
                    />
                  </div>
                )}
                {!isPlay && (
                  <div className="play-video-icon" onClick={this.playVideo}>
                    <Icon type="caret-right" />
                  </div>
                )}
              </Row>
              <Row>
                <Row className="play-introduction-title">视频介绍</Row>
                <Row>{videoIntroduction}</Row>
              </Row>
            </Spin>
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
