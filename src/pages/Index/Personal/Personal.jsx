import React, { Component } from 'react';
import { Row, BackTop, Avatar, Button, Tabs, Pagination } from 'antd';

import './Personal.css';
import testAvatar from '../../../assets/test-avatar.jpg';
import VideoData from '../OfficialData';
import ArticleData from '../ArticleData';
import VideoList from '../../../components/VideoList/VideoList';
import ArticleList from '../../../components/ArticleList/ArticleList';

const { Group: ButtonGroup } = Button;
const { TabPane } = Tabs;

export default class Personal extends Component {
  state = {
    userInfo: {
      avatar: testAvatar,
      username: 'testName',
      introduction: '个人介绍',
      sex: '男',
      hometown: '未设置',
      joinTime: '2019-03-03'
    },
    videoCurrentPage: 1,
    videoList: [...VideoData, ...VideoData, ...VideoData],
    articleCurrentPage: 1,
    articleList: [
      ...ArticleData,
      ...ArticleData,
      ...ArticleData,
      ...ArticleData
    ],
    pvCurrentPage: 1,
    pendingVideo: [...VideoData, ...VideoData, ...VideoData],
    paCurrentPage: 1,
    pendingArticle: [
      ...ArticleData,
      ...ArticleData,
      ...ArticleData,
      ...ArticleData
    ]
  };

  changeTabPane = activeKey => {
    // TODO:在这里请求接口
    this.setState({
      videoCurrentPage: 1,
      articleCurrentPage: 1,
      pvCurrentPage: 1,
      paCurrentPage: 1
    });
  };

  changeVideoPage = page => {
    this.setState({
      videoCurrentPage: page
    });
  };

  changeArticlePage = page => {
    this.setState({
      articleCurrentPage: page
    });
  };

  changePVPage = page => {
    this.setState({
      pvCurrentPage: page
    });
  };

  changePAPage = page => {
    this.setState({
      paCurrentPage: page
    });
  };

  render() {
    const {
      match: {
        params: { userId }
      }
    } = this.props;
    const {
      userInfo: { avatar, username, introduction, sex, hometown, joinTime },
      videoCurrentPage,
      videoList,
      articleCurrentPage,
      articleList,
      pvCurrentPage,
      pendingVideo,
      paCurrentPage,
      pendingArticle
    } = this.state;
    const isSelf = userId === 'id';
    const isAdmin = userId === 'admin';
    const videoNumber = videoList.length;
    const videoNeedPagination = videoNumber > 12;
    const articleNumber = articleList.length;
    const articleNeedPagination = articleNumber > 9;
    const pvNumber = pendingVideo.length;
    const pvNeedPagination = pvNumber > 12;
    const paNumber = pendingArticle.length;
    const paNeedPagination = paNumber > 9;
    return (
      <div>
        <div className="section">
          <div className="section-content">
            <Row className="personal-header" type="flex" align="middle">
              <Avatar
                src={avatar}
                icon="user"
                size={80}
                style={{ marginRight: 32 }}
              />
              <div style={{ flex: 1 }}>
                <Row className="personal-username">{username}</Row>
                <Row>{introduction}</Row>
                <Row className="personal-other-info">
                  <span>性别：{sex}</span>
                  <span>家乡：{hometown}</span>
                  <span>加入时间：{joinTime}</span>
                </Row>
              </div>
              {isSelf ? (
                <Button href="/index/personal/setting">编辑资料</Button>
              ) : null}
            </Row>
            {isSelf ? (
              <Row type="flex" justify="center" style={{ marginBottom: 32 }}>
                <ButtonGroup size="large">
                  <Button
                    type="primary"
                    href="/index/upload/video"
                    style={{ padding: '0 40px' }}
                  >
                    投稿视频
                  </Button>
                  <Button
                    type="primary"
                    href="/index/upload/article"
                    style={{ padding: '0 40px' }}
                  >
                    投稿文章
                  </Button>
                  {isAdmin ? (
                    <Button
                      type="primary"
                      href="/index/auction"
                      style={{ padding: '0 40px' }}
                    >
                      二手拍卖
                    </Button>
                  ) : null}
                </ButtonGroup>
              </Row>
            ) : null}
            <Row>
              <Tabs onChange={this.changeTabPane}>
                <TabPane key="video" tab={'投稿的视频（' + videoNumber + '）'}>
                  <Row>
                    <VideoList
                      videoList={videoList.filter(
                        (value, index) =>
                          (videoCurrentPage - 1) * 12 <= index &&
                          index <= videoCurrentPage * 12 - 1
                      )}
                    />
                  </Row>
                  {videoNeedPagination ? (
                    <Row type="flex" justify="center">
                      <Pagination
                        current={videoCurrentPage}
                        pageSize={12}
                        total={videoNumber}
                        onChange={this.changeVideoPage}
                      />
                    </Row>
                  ) : null}
                </TabPane>
                <TabPane
                  key="article"
                  tab={'投稿的文章（' + articleNumber + '）'}
                >
                  <ArticleList
                    articleList={articleList.filter(
                      (value, index) =>
                        (articleCurrentPage - 1) * 9 <= index &&
                        index <= articleCurrentPage * 9 - 1
                    )}
                  />
                  {articleNeedPagination ? (
                    <Row type="flex" justify="center">
                      <Pagination
                        current={articleCurrentPage}
                        pageSize={9}
                        total={articleNumber}
                        onChange={this.changeArticlePage}
                      />
                    </Row>
                  ) : null}
                </TabPane>
                {isSelf ? (
                  <TabPane
                    key="pendingVideo"
                    tab={'待审核视频（' + pvNumber + '）'}
                  >
                    <Row>
                      <VideoList
                        videoList={pendingVideo.filter(
                          (value, index) =>
                            (pvCurrentPage - 1) * 12 <= index &&
                            index <= pvCurrentPage * 12 - 1
                        )}
                      />
                    </Row>
                    {pvNeedPagination ? (
                      <Row type="flex" justify="center">
                        <Pagination
                          current={pvCurrentPage}
                          pageSize={12}
                          total={pvNumber}
                          onChange={this.changePVPage}
                        />
                      </Row>
                    ) : null}
                  </TabPane>
                ) : null}
                {isSelf ? (
                  <TabPane
                    key="pendingArticle"
                    tab={'待审核文章（' + paNumber + '）'}
                  >
                    <ArticleList
                      articleList={pendingArticle.filter(
                        (value, index) =>
                          (paCurrentPage - 1) * 9 <= index &&
                          index <= paCurrentPage * 9 - 1
                      )}
                    />
                    {paNeedPagination ? (
                      <Row type="flex" justify="center">
                        <Pagination
                          current={paCurrentPage}
                          pageSize={9}
                          total={paNumber}
                          onChange={this.changePAPage}
                        />
                      </Row>
                    ) : null}
                  </TabPane>
                ) : null}
              </Tabs>
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
