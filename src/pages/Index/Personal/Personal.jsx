import React, { Component } from 'react';
import {
  Row,
  BackTop,
  Avatar,
  Button,
  Tabs,
  Pagination,
  Modal,
  message
} from 'antd';
import _ from 'lodash';

import './Personal.css';
import VideoList from '../../../components/VideoList/VideoList';
import ArticleList from '../../../components/ArticleList/ArticleList';
import AddressData from '../cascader-address-options';

const { Group: ButtonGroup } = Button;
const { TabPane } = Tabs;

export default class Personal extends Component {
  state = {
    loading: true,
    videoCurrentPage: 1,
    videoList: [],
    articleCurrentPage: 1,
    articleList: [],
    pvCurrentPage: 1,
    pendingVideo: [],
    paCurrentPage: 1,
    pendingArticle: []
  };

  componentWillMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.getVideoByUserIdHandler(id);
    this.getArticleByUserIdHandler(id);
  }

  formatHometown = hometown => {
    const pca = hometown.split(',');
    const province = _.find(AddressData, value => value.value === pca[0]);
    const city = _.find(province.children, value => value.value === pca[1]);
    const area = _.find(city.children, value => value.value === pca[2]);
    return `${province.label} ${city.label} ${area.label}`;
  };

  getVideoByUserIdHandler = id => {
    const { getVideoByUserId } = this.props;
    getVideoByUserId(id)
      .then(res => {
        const {
          data: { data }
        } = res;
        this.setState({
          videoList: data.map((value, index) => ({
            key: index,
            userId: value.userId,
            time: value.createTime,
            videoId: value.id,
            videoTitle: value.title,
            contentType: value.type.id,
            videoUrl: value.videoUrl,
            videoCover: `http://${value.headPictureUrl}`,
            videoIntroduction: value.introduction,
            status: value.status
          }))
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  getArticleByUserIdHandler = id => {
    const { getArticleByUserId } = this.props;
    getArticleByUserId(id)
      .then(res => {
        const {
          data: { data }
        } = res;
        this.setState({
          articleList: data.map((value, index) => ({
            userId: value.userId,
            time: value.createTime,
            articleId: value.id,
            articleCover: `http://${value.headPictureUrl}`,
            articleTitle: value.title,
            contentType: value.articleType.id,
            articleIntroduction: value.introduction,
            status: value.status
          }))
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  getPendingArticleByUserIdHandler = () => {
    const { getPendingArticleByUserId } = this.props;
    getPendingArticleByUserId()
      .then(res => {
        const {
          data: { data }
        } = res;
        this.setState({
          articleList: data.map((value, index) => ({
            key: index,
            userId: value.userId,
            time: value.createTime,
            articleCover: `http://${value.headPictureUrl}`,
            articleTitle: value.title,
            contentType: value.articleType.id,
            articleIntroduction: value.introduction,
            articleContent: value.content,
            status: value.status
          }))
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  getPendingVideoByUserIdHandler = () => {
    const { getPendingVideoByUserId } = this.props;
    getPendingVideoByUserId()
      .then(res => {
        const {
          data: { data }
        } = res;
        this.setState({
          articleList: data.map((value, index) => ({
            key: index,
            userId: value.userId,
            time: value.createTime,
            videoId: value.id,
            videoTitle: value.title,
            contentType: value.type.id,
            videoUrl: value.videoUrl,
            videoCover: `http://${value.headPictureUrl}`,
            videoIntroduction: value.introduction,
            status: value.status
          }))
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  changeTabPane = activeKey => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    // TODO:在这里请求接口
    const switchMap = new Map([
      ['video', this.getVideoByUserIdHandler(id)],
      ['article', this.getArticleByUserIdHandler(id)],
      ['pendingVideo', this.getPendingVideoByUserIdHandler],
      ['pendingArticle', this.getPendingArticleByUserIdHandler]
    ]);
    switchMap.get(activeKey);
    this.setState({
      loading: true,
      videoCurrentPage: 1,
      articleCurrentPage: 1,
      pvCurrentPage: 1,
      paCurrentPage: 1
    });
  };

  deleteVideoHandler = videoId => {
    const { deleteVideo } = this.props;
    const { videoList } = this.state;
    const that = this;
    Modal.confirm({
      title: '删除是不可逆的操作，是否确定',
      icon: false,
      centered: true,
      okType: 'danger',
      onOk: () => {
        const formData = new FormData();
        formData.append('id', videoId);
        deleteVideo(formData)
          .then(() => {
            message.success('删除成功');
            that.setState({
              videoList: videoList.filter(value => value.videoId !== videoId)
            });
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  deletePVHandler = videoId => {
    const { pendingVideo } = this.state;
    const that = this;
    Modal.confirm({
      title: '删除是不可逆的操作，是否确定',
      icon: false,
      centered: true,
      okType: 'danger',
      onOk: () => {
        that.setState({
          pendingVideo: pendingVideo.filter(value => value.videoId !== videoId)
        });
      }
    });
  };

  deleteArticleHandler = articleId => {
    const { deleteVideo } = this.props;
    const { articleList } = this.state;
    const that = this;
    Modal.confirm({
      title: '删除是不可逆的操作，是否确定',
      icon: false,
      centered: true,
      okType: 'danger',
      onOk: () => {
        const formData = new FormData();
        formData.append('articleId', articleId);
        deleteVideo(formData)
          .then(() => {
            message.success('删除成功');
            that.setState({
              articleList: articleList.filter(
                value => value.articleId !== articleId
              )
            });
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  deletePAHandler = articleId => {
    const { pendingArticle } = this.state;
    const that = this;
    Modal.confirm({
      title: '删除是不可逆的操作，是否确定',
      icon: false,
      centered: true,
      okType: 'danger',
      onOk: () => {
        that.setState({
          pendingArticle: pendingArticle.filter(
            value => value.articleId !== articleId
          )
        });
      }
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
        params: { id }
      },
      userInfo: { avatar, username, introduction, sex, hometown, birthday }
    } = this.props;
    const {
      videoCurrentPage,
      videoList,
      articleCurrentPage,
      articleList,
      pvCurrentPage,
      pendingVideo,
      paCurrentPage,
      pendingArticle
    } = this.state;
    const isSelf = id === localStorage.getItem('userId');
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
                  <span>家乡：{this.formatHometown(hometown)}</span>
                  <span>生日：{birthday}</span>
                </Row>
              </div>
              {isSelf && (
                <Button href="/index/personal-setting">编辑资料</Button>
              )}
            </Row>
            {isSelf && (
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
                </ButtonGroup>
              </Row>
            )}
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
                      hasAction={isSelf}
                      deleteVideo={this.deleteVideoHandler}
                    />
                  </Row>
                  {videoNeedPagination && (
                    <Row type="flex" justify="center">
                      <Pagination
                        current={videoCurrentPage}
                        pageSize={12}
                        total={videoNumber}
                        onChange={this.changeVideoPage}
                      />
                    </Row>
                  )}
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
                    hasAction={isSelf}
                    deleteArticle={this.deleteArticleHandler}
                  />
                  {articleNeedPagination && (
                    <Row type="flex" justify="center">
                      <Pagination
                        current={articleCurrentPage}
                        pageSize={9}
                        total={articleNumber}
                        onChange={this.changeArticlePage}
                      />
                    </Row>
                  )}
                </TabPane>
                {/* {isSelf && (
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
                        hasAction={isSelf}
                        deleteVideo={this.deletePVHandler}
                      />
                    </Row>
                    {pvNeedPagination && (
                      <Row type="flex" justify="center">
                        <Pagination
                          current={pvCurrentPage}
                          pageSize={12}
                          total={pvNumber}
                          onChange={this.changePVPage}
                        />
                      </Row>
                    )}
                  </TabPane>
                )}
                {isSelf && (
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
                      hasAction={isSelf}
                      deleteArticle={this.deletePAHandler}
                    />
                    {paNeedPagination && (
                      <Row type="flex" justify="center">
                        <Pagination
                          current={paCurrentPage}
                          pageSize={9}
                          total={paNumber}
                          onChange={this.changePAPage}
                        />
                      </Row>
                    )}
                  </TabPane>
                )} */}
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
