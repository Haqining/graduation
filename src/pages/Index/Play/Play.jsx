import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Breadcrumb, Icon, Button, message } from 'antd';
import ReactPlayer from 'react-player';
import BraftEditor from 'braft-editor';

import './Play.css';
import VideoInfo from './VideoInfo';

const { Item: BreadcrumbItem } = Breadcrumb;

const controls = ['bold', 'italic', 'blockquote', 'emoji'];

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoInfo: VideoInfo,
      isPlay: false,
      isFirstClick: true,
      editorState: BraftEditor.createEditorState(),
      comments: []
    };
  }

  chooseType = videoType => {
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

  editorChangeHandler = editorState => {
    this.setState({
      editorState
    });
  };

  submitComment = () => {
    const { editorState } = this.state;
    if (editorState.isEmpty()) {
      message.error('请输入评论的内容 (￣▽￣)');
    }
  };

  render() {
    const {
      match: {
        params: { videoType }
      }
    } = this.props;
    const {
      videoInfo: { videoTitle, videoUrl, videoWrapper, videoIntroduction },
      isPlay,
      isFirstClick,
      editorState
    } = this.state;
    return (
      <div>
        <Row className="section play-content">
          <Row className="section-content">
            <Breadcrumb className="play-breadcrumb">
              <BreadcrumbItem>{this.chooseType(videoType)}</BreadcrumbItem>
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
                    style={{ backgroundImage: `url(${videoWrapper})` }}
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
          </Row>
        </Row>
        <Row className="section play-comment-content">
          <Row className="section-content ">
            <Row className="play-editor-content">
              <BraftEditor
                className="play-editor"
                value={editorState}
                controls={controls}
                placeholder="可以在这里编辑评论内容 ε=ε=ε=(~￣▽￣)~"
                onChange={this.editorChangeHandler}
              />
              <Row type="flex" justify="end">
                <Button
                  type="primary"
                  size="large"
                  onClick={this.submitComment}
                  style={{ padding: '0 40px' }}
                >
                  评论
                </Button>
              </Row>
            </Row>
            <Row>ddi</Row>
          </Row>
        </Row>
      </div>
    );
  }
}
