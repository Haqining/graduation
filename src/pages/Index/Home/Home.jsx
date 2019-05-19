import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Divider, Button, BackTop } from 'antd';

import VideoList from '../../../components/VideoList/VideoList';
import ArticleList from '../../../components/ArticleList/ArticleList';

import './Home.css';
import bannersData from './bannersData';
import OfficialData from '../OfficialData';
// import TalentData from '../TalentData';
import ArticleData from '../ArticleData';

export default class Home extends Component {
  state = {
    banners: bannersData,
    officialVideos: OfficialData,
    // talentVideos: TalentData,
    articleList: ArticleData
  };

  render() {
    const {
      banners: { big, small },
      officialVideos,
      // talentVideos,
      articleList
    } = this.state;
    return (
      <div>
        <div className="section home-banner">
          <div className="section-content">
            <Row type="flex">
              <div
                className="home-banner-left"
                span={12}
                title={big.videoTitle}
              >
                <Link
                  className="home-banner-image"
                  to={`/index/play/${big.videoId}`}
                  target="_blank"
                  style={{ backgroundImage: `url('${big.videoCover}')` }}
                >
                  <span className="shadow-inside" />
                </Link>
              </div>
              <div className="home-banner-right">
                <div className="home-banner-tl" title={small.videoTitle}>
                  <Link
                    className="home-banner-image"
                    to={`/index/play/${small.videoId}`}
                    target="_blank"
                    style={{ backgroundImage: `url('${small.videoCover}')` }}
                  >
                    <span className="shadow-inside" />
                  </Link>
                </div>
                <div className="home-banner-tr" title={small.videoTitle}>
                  <Link
                    className="home-banner-image"
                    to={`/index/play/${small.videoId}`}
                    target="_blank"
                    style={{ backgroundImage: `url('${small.videoCover}')` }}
                  >
                    <span className="shadow-inside" />
                  </Link>
                </div>
                <div className="home-banner-bl" title={small.videoTitle}>
                  <Link
                    className="home-banner-image"
                    to={`/index/play/${small.videoId}`}
                    target="_blank"
                    style={{ backgroundImage: `url('${small.videoCover}')` }}
                  >
                    <span className="shadow-inside" />
                  </Link>
                </div>
                <div className="home-banner-br" title={small.videoTitle}>
                  <Link
                    className="home-banner-image"
                    to={`/index/play/${small.videoId}`}
                    target="_blank"
                    style={{ backgroundImage: `url('${small.videoCover}')` }}
                  >
                    <span className="shadow-inside" />
                  </Link>
                </div>
              </div>
            </Row>
          </div>
        </div>
        <div className="section">
          <div className="section-content">
            <Divider
              className="home-channel-title"
              style={{ margin: '0 0 40px 0' }}
            >
              测评视频
            </Divider>
            <Row>
              <VideoList videoList={officialVideos} />
            </Row>
            <Row type="flex" justify="center">
              <Button
                href="/index/official"
                type="primary"
                size="large"
                style={{ padding: '0 40px' }}
              >
                更多视频
              </Button>
            </Row>
          </div>
        </div>
        {/* <div className="section">
          <div className="section-content">
            <Divider
              className="home-channel-title"
              style={{ margin: '0 0 40px 0' }}
            >
              达人频道
            </Divider>
            <Row>
              <VideoList videoList={talentVideos} />
            </Row>
            <Row type="flex" justify="center">
              <Button
                href="/index/talent"
                type="primary"
                size="large"
                style={{ padding: '0 40px' }}
              >
                更多视频
              </Button>
            </Row>
          </div>
        </div> */}
        <div className="section">
          <div className="section-content">
            <Divider
              className="home-channel-title"
              style={{ margin: '0 0 40px 0' }}
            >
              测评文章
            </Divider>
            <Row>
              <ArticleList articleList={articleList} />
            </Row>
            <Row type="flex" justify="center">
              <Button
                href="/index/article"
                type="primary"
                size="large"
                style={{ padding: '0 40px' }}
              >
                更多文章
              </Button>
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
