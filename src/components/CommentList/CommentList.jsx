import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Input,
  Button,
  message,
  Empty,
  Pagination,
  Avatar,
  Divider,
  Spin
} from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import './CommentList.css';

const { TextArea } = Input;

export default class CommentList extends Component {
  static propTypes = {
    contentId: PropTypes.string.isRequired
  };

  state = {
    commentContent: '',
    commentLength: 0,
    replyComment: null,
    commentList: [],
    // 保存被引用者的id用于请求
    cited: '',
    currentPage: 1,
    loading: true
  };

  componentWillMount() {
    this.getCommentByIdHandler();
  }

  getCommentByIdHandler() {
    const { contentId, getCommentById } = this.props;
    getCommentById({ articleId: contentId })
      .then(res => {
        const {
          data: { data }
        } = res;
        this.setState({
          commentList: data.map(value => ({
            id: value.userId,
            time: moment(value.createTime).format('YYYY-MM-DD HH:mm'),
            commentContent: value.content,
            like: 10,
            liked: false
          }))
        });
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  changeComment = e => {
    const {
      target: { value }
    } = e;
    if (value.length > 240) {
      message.error('超过最大可输入字符');
    } else {
      this.setState({ commentContent: value, commentLength: value.length });
    }
  };

  submitComment = () => {
    const { saveComment, contentId } = this.props;
    const { commentContent, replyComment } = this.state;
    if (!commentContent) {
      message.error('请输入评论的内容 (～￣(OO)￣)ブ');
    } else {
      const formData = new FormData();
      formData.append('articleId', +contentId);
      formData.append(
        'referId',
        !_.isEmpty(replyComment) ? replyComment.id : 0
      );
      formData.append('userId', localStorage.getItem('userId'));
      formData.append(
        'content',
        !_.isEmpty(replyComment)
          ? `<blockquote>回复：${
              replyComment.commentContent
            }</blockquote>${commentContent}`
          : commentContent
      );
      saveComment(formData)
        .then(res => {
          message.success('评论成功 d=====(￣▽￣*)b');
          this.getCommentByIdHandler();
          this.setState({
            commentContent: '',
            replyComment: null
          });
        })
        .catch(err => {
          message.error(err);
        });
    }
  };

  changeCommentLike = index => () => {
    const { commentList, currentPage } = this.state;
    const selectComment = commentList[(currentPage - 1) * 10 + index];
    if (selectComment.liked) {
      selectComment.like -= 1;
    } else {
      selectComment.like += 1;
    }
    selectComment.liked = !selectComment.liked;
    commentList[(currentPage - 1) * 10 + index] = { ...selectComment };
    this.setState({
      commentList
    });
  };

  reply = index => () => {
    const { commentList, currentPage } = this.state;
    const selectComment = { ...commentList[(currentPage - 1) * 10 + index] };
    selectComment.commentContent =
      selectComment.commentContent.split('</blockquote>')[1] ||
      selectComment.commentContent;
    this.refs.commentTextArea.textAreaRef.focus();
    this.setState({
      commentContent: '',
      replyComment: selectComment
    });
  };

  cancelReply = () => {
    this.setState({
      replyComment: null
    });
  };

  changePage = page => {
    this.setState({
      currentPage: page
    });
  };

  notLoggedInTips = () => {
    message.info('需要登录');
  };

  render() {
    const {
      loading,
      commentContent,
      commentLength,
      replyComment,
      commentList,
      currentPage
    } = this.state;
    const isLogin = !!localStorage.getItem('userId');
    const hasData = !_.isEmpty(commentList);
    const dataLength = commentList.length;
    const needPagination = dataLength > 10;
    return (
      <Spin spinning={loading}>
        {!_.isEmpty(replyComment) && (
          <Row type="flex" style={{ marginBottom: 8 }}>
            <div className="comment-reply">
              回复：{replyComment.commentContent}
            </div>
            <div className="comment-cancel-reply" onClick={this.cancelReply}>
              取消回复
            </div>
          </Row>
        )}
        {isLogin ? (
          <div>
            <Row style={{ marginBottom: 24 }}>
              <TextArea
                className="comment-editor"
                ref="commentTextArea"
                value={commentContent}
                rows={3}
                placeholder="编辑内容(最多240个字符)"
                onChange={this.changeComment}
              />
              <Row type="flex" justify="end">
                {commentLength}/240
              </Row>
            </Row>
            <Row type="flex" justify="end">
              <Button
                type="primary"
                size="large"
                onClick={this.submitComment}
                style={{ padding: '0 40px' }}
              >
                提交评论
              </Button>
            </Row>
          </div>
        ) : (
          <Row type="flex" justify="center">
            <span>登录后可以进行评论和点赞回复别人的评论。</span>
            <Link to="/login">去登录</Link>
          </Row>
        )}
        <Divider />
        <Row style={{ marginBottom: 24 }}>
          {hasData ? (
            commentList
              .filter(
                (value, index) =>
                  (currentPage - 1) * 10 <= index &&
                  index <= currentPage * 10 - 1
              )
              .map((value, index) => (
                <Row
                  className="comment-item"
                  key={`comment${index}`}
                  type="flex"
                >
                  {/* <div>
                    <Link to={`/index/personal/${value.id}`} target="_blank">
                      <Avatar
                        src={value.avatar}
                        size={48}
                        icon="user"
                        style={{ marginRight: 24 }}
                      />
                    </Link>
                  </div> */}
                  <div className="comment-item-right">
                    {/* <Row
                      type="flex"
                      justify="space-between"
                      style={{ marginBottom: 8 }}
                    >
                      <Link
                        className="avatar-username"
                        to={`/index/personal/${value.id}`}
                        target="_blank"
                      >
                        {value.username}
                      </Link>
                      <span style={{ color: '#c7c7c7' }}>{value.time}</span>
                    </Row> */}
                    <Row style={{ marginBottom: 8 }}>
                      <div
                        className="braft-output-content"
                        dangerouslySetInnerHTML={{
                          __html: value.commentContent
                        }}
                      />
                    </Row>
                    <Row
                      className="comment-item-action"
                      type="flex"
                      justify="end"
                      align="middle"
                    >
                      <span
                        onClick={
                          isLogin
                            ? this.changeCommentLike(index)
                            : this.notLoggedInTips
                        }
                        style={{ color: value.liked ? '#ed1c24' : '' }}
                      >
                        {value.liked ? '已赞' : '点赞'}({value.like})
                      </span>
                      <Divider type="vertical" />
                      <span
                        onClick={
                          isLogin ? this.reply(index) : this.notLoggedInTips
                        }
                      >
                        回复
                      </span>
                    </Row>
                  </div>
                </Row>
              ))
          ) : (
            <Empty
              description="还没有评论，快来抢沙发吧 ┑(￣Д ￣)┍"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </Row>
        {needPagination && (
          <Row type="flex" justify="center">
            <Pagination
              pageSize={10}
              total={dataLength}
              onChange={this.changePage}
            />
          </Row>
        )}
      </Spin>
    );
  }
}
