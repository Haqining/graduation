import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';

import './Home.css';
import bannerLeft from '../../../assets/banner-left.jpg';
import bannerSmall from '../../../assets/banner-small.jpg';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Row className="section home-banner">
          <Row className="section-content" type="flex">
            <div className="home-banner-left">
              <Link>
                <img src={bannerLeft} alt="" />
                <span className="shadow-inside" />
              </Link>
            </div>
            <div className="home-banner-right">
              <Col className="home-banner-tl" span={12}>
                <Link>
                  <img src={bannerSmall} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
              <Col className="home-banner-tr" span={12}>
                <Link>
                  <img src={bannerSmall} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
              <Col className="home-banner-bl" span={12}>
                <Link>
                  <img src={bannerSmall} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
              <Col className="home-banner-br" span={12}>
                <Link>
                  <img src={bannerSmall} alt="" />
                  <span className="shadow-inside" />
                </Link>
              </Col>
            </div>
          </Row>
        </Row>
        <Row className="section home-official">
          <Row className="section-content">
            <Divider className="home-channel-title" style={{ marginTop: 0 }}>
              官方频道
            </Divider>
            <Row>
              d
            </Row>
          </Row>
        </Row>
      </div>
    );
  }
}
