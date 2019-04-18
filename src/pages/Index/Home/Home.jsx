import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider, Button } from 'antd';

import VideoCardList from '../../../components/VideoCardList/VideoCardList';

import './Home.css';
import bannersData from './bannersData';
import officialData from './officialData';
import talentData from './TalentData';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: bannersData,
      officialVideos: officialData,
      talentVideos: talentData
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
            <div className="home-banner-left" title={left.title}>
              <Link to={`/play/${left.videoId}`}>
                <img src={left.imgSrc} alt="" />
                <span className="shadow-inside" />
              </Link>
            </div>
            <div className="home-banner-right">
              <Col className="home-banner-tl" span={12} title={tl.title}>
                <Link to={`/play/${tl.videoId}`}>
                  <img src={tl.imgSrc} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
              <Col className="home-banner-tr" span={12} title={tr.title}>
                <Link to={`/play/${tr.videoId}`}>
                  <img src={tr.imgSrc} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
              <Col className="home-banner-bl" span={12} title={bl.title}>
                <Link to={`/play/${bl.videoId}`}>
                  <img src={bl.imgSrc} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
              <Col className="home-banner-br" span={12} title={br.title}>
                <Link to={`/play/${br.videoId}`}>
                  <img src={br.imgSrc} alt="" />
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
              官方视频
            </Divider>
            <Row>
              <VideoCardList videoList={officialVideos} type="official" />
            </Row>
            <Row type="flex" justify="center">
              <Button>更多视频</Button>
            </Row>
          </Row>
        </Row>
        <Row className="section home-talent">
          <Row className="section-content">
            <Divider
              className="home-channel-title"
              style={{ margin: '0 0 40px 0' }}
            >
              达人视频
            </Divider>
            <Row>
              <VideoCardList videoList={talentVideos} type="talent" />
            </Row>
            <Row type="flex" justify="center">
              <Button>更多视频</Button>
            </Row>
          </Row>
        </Row>
      </div>
    );
  }
}
