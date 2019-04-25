import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider, Button, BackTop } from 'antd';

import VideoCardList from '../../../components/VideoCardList/VideoCardList';

import './Home.css';
import bannersData from './bannersData';
import OfficialData from '../OfficialData';
import TalentData from '../TalentData';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: bannersData,
      officialVideos: OfficialData,
      talentVideos: TalentData
    };
  }

  render() {
    const {
      banners: { left, tl, tr, bl, br },
      officialVideos,
      talentVideos
    } = this.state;
    return (
      <div>
        <Row className="section home-banner">
          <Row className="section-content" type="flex">
            <div className="home-banner-left" title={left.videoTitle}>
              <Link to={`/index/play/${left.videoId}&&${left.videoType}`}>
                <img src={left.videoCover} alt="" />
                <span className="shadow-inside" />
              </Link>
            </div>
            <div className="home-banner-right">
              <Col className="home-banner-tl" span={12} title={tl.videoTitle}>
                <Link to={`/index/play/${tl.videoId}&&${tl.videoType}`}>
                  <img src={tl.videoCover} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
              <Col className="home-banner-tr" span={12} title={tr.videoTitle}>
                <Link to={`/index/play/${tr.videoId}&&${tr.videoType}`}>
                  <img src={tr.videoCover} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
              <Col className="home-banner-bl" span={12} title={bl.videoTitle}>
                <Link to={`/index/play/${bl.videoId}&&${bl.videoType}`}>
                  <img src={bl.videoCover} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
              <Col className="home-banner-br" span={12} title={br.videoTitle}>
                <Link to={`/index/play/${br.videoId}&&${br.videoType}`}>
                  <img src={br.videoCover} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
            </div>
          </Row>
        </Row>
        <Row className="section home-official">
          <Row className="section-content">
            <Divider
              className="home-channel-title"
              style={{ margin: '0 0 40px 0' }}
            >
              官方频道
            </Divider>
            <Row>
              <VideoCardList videoList={officialVideos} />
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
          </Row>
        </Row>
        <Row className="section home-talent">
          <Row className="section-content">
            <Divider
              className="home-channel-title"
              style={{ margin: '0 0 40px 0' }}
            >
              达人频道
            </Divider>
            <Row>
              <VideoCardList videoList={talentVideos} />
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
          </Row>
        </Row>
        <BackTop visibilityHeight={0}>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}
