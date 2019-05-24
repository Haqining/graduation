import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Divider, Button, BackTop } from 'antd';
import _ from 'lodash';

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
    const { videoList, articleList } = this.props;
    const hasTop = videoList.length > 5;
    const hasVideo = !_.isEmpty(videoList);
    const hasArticle = !_.isEmpty(videoList);
    return (
      <div>
        {hasTop && (
          <div className="section home-banner">
            <div className="section-content">
              <Row type="flex">
                <div
                  className="home-banner-left"
                  span={12}
                  title={videoList[0].videoTitle}
                >
                  <Link
                    className="home-banner-image"
                    to={`/index/play/${videoList[0].videoId}`}
                    target="_blank"
                    style={{
                      backgroundImage: `url('${videoList[0].videoCover}')`
                    }}
                  >
                    <span className="shadow-inside" />
                  </Link>
                </div>
                <div className="home-banner-right">
                  <div
                    className="home-banner-tl"
                    title={videoList[1].videoTitle}
                  >
                    <Link
                      className="home-banner-image"
                      to={`/index/play/${videoList[1].videoId}`}
                      target="_blank"
                      style={{
                        backgroundImage: `url('${videoList[1].videoCover}')`
                      }}
                    >
                      <span className="shadow-inside" />
                    </Link>
                  </div>
                  <div
                    className="home-banner-tr"
                    title={videoList[2].videoTitle}
                  >
                    <Link
                      className="home-banner-image"
                      to={`/index/play/${videoList[2].videoId}`}
                      target="_blank"
                      style={{
                        backgroundImage: `url('${videoList[2].videoCover}')`
                      }}
                    >
                      <span className="shadow-inside" />
                    </Link>
                  </div>
                  <div
                    className="home-banner-bl"
                    title={videoList[3].videoTitle}
                  >
                    <Link
                      className="home-banner-image"
                      to={`/index/play/${videoList[3].videoId}`}
                      target="_blank"
                      style={{
                        backgroundImage: `url('${videoList[3].videoCover}')`
                      }}
                    >
                      <span className="shadow-inside" />
                    </Link>
                  </div>
                  <div
                    className="home-banner-br"
                    title={videoList[4].videoTitle}
                  >
                    <Link
                      className="home-banner-image"
                      to={`/index/play/${videoList[4].videoId}`}
                      target="_blank"
                      style={{
                        backgroundImage: `url('${videoList[4].videoCover}')`
                      }}
                    >
                      <span className="shadow-inside" />
                    </Link>
                  </div>
                </div>
              </Row>
            </div>
          </div>
        )}
        <div className="section">
          <div className="section-content">
            <Divider
              className="home-channel-title"
              style={{ margin: '0 0 40px 0' }}
            >
              测评视频
            </Divider>
            <Row>
              <VideoList
                videoList={
                  hasTop
                    ? videoList.filter(
                        (value, index) => index > 6 || index < 12
                      )
                    : videoList
                }
              />
            </Row>
            {hasVideo && (
              <Row type="flex" justify="center">
                <Button
                  href="/index/official"
                  type="primary"
                  size="large"
                  style={{ padding: '0 40px' }}
                >
                  全部视频
                </Button>
              </Row>
            )}
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
            {hasArticle && (
              <Row type="flex" justify="center">
                <Button
                  href="/index/article"
                  type="primary"
                  size="large"
                  style={{ padding: '0 40px' }}
                >
                  全部文章
                </Button>
              </Row>
            )}
          </div>
        </div>
        <BackTop visibilityHeight={0}>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}
