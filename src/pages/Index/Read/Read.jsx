import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Breadcrumb, Avatar, message } from 'antd';
import moment from 'moment';

import './Read.css';
import ContentType from '../../../ContentType.js';
import ArticleData from './ArticleData';
import CommentList from '../../../components/CommentList/CommentListContainer';

const { Item: BreadcrumbItem } = Breadcrumb;

export default class Read extends Component {
  state = {
    articleData: {}
  };

  componentWillMount() {
    const {
      match: {
        params: { articleId }
      },
      getArticleById
    } = this.props;
    getArticleById({ id: articleId })
      .then(res => {
        const {
          data: { data }
        } = res;
        this.setState({
          articleData: {
            userId: data.userId,
            articleId: data.id,
            time: moment(data.createTime).format('YYYY-MM-DD HH:mm'),
            articleCover: `http://${data.headPictureUrl}`,
            articleTitle: data.title,
            contentType: data.articleType.id,
            articleIntroduction: data.introduction,
            articleContent: data.content
          }
        });
      })
      .catch(err => {
        message.error(err);
      });
  }

  changeArticleLike = () => {
    const { articleData } = this.state;
    if (articleData.liked) {
      articleData.like -= 1;
    } else {
      articleData.like += 1;
    }
    articleData.liked = !articleData.liked;
    this.setState({
      articleData
    });
  };

  render() {
    const {
      match: {
        params: { articleId }
      }
    } = this.props;
    const {
      articleData: {
        userId,
        avatar,
        username,
        time,
        contentType,
        articleTitle,
        articleCover,
        articleContent,
        comments
      }
    } = this.state;
    return (
      <div>
        <div className="section">
          <div className="section-content read-content">
            <Breadcrumb className="content-breadcrumb">
              <BreadcrumbItem>
                <Link to="/index/article">测评文章</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>{ContentType[contentType]}</BreadcrumbItem>
              <BreadcrumbItem>文章</BreadcrumbItem>
            </Breadcrumb>
            <Row className="content-title">{articleTitle}</Row>
            <Row className="content-info" type="flex" align="middle">
              <span>
                <Link
                  className="avatar-username"
                  to={`/index/personal/${userId}`}
                  target="_blank"
                >
                  {/* <Avatar src={avatar} icon="user" style={{ marginRight: 8 }} /> */}
                  <span>{userId}</span>
                </Link>
              </span>
              {/* <span>评论({comments})</span> */}
              <span>{time}</span>
            </Row>
            <Row style={{ marginBottom: 24 }}>
              <img
                src={articleCover}
                alt="articleCover"
                style={{ width: '100%' }}
              />
            </Row>
            <Row>
              <div
                className="braft-output-content"
                dangerouslySetInnerHTML={{
                  __html: articleContent
                }}
              />
            </Row>
            {/* <Row type="flex" justify="center" style={{ marginBottom: 32 }}>
              <Button
                type="primary"
                size="large"
                onClick={this.changeArticleLike}
                style={{ padding: '0 40px' }}
              >
                {liked ? '已赞' : '点赞'}
                <Divider type="vertical" />
                {like}
              </Button>
            </Row> */}
          </div>
        </div>
        <div className="section play-comment-content">
          <div className="section-content ">
            <Row className="play-editor-content">
              <CommentList contentId={articleId} />
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
