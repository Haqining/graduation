import React, { Component } from 'react';
import {
  Table,
  Tooltip,
  Tag,
  Modal,
  Button,
  Popconfirm,
  Row,
  message,
  Divider
} from 'antd';
import _ from 'lodash';
import moment from 'moment';

import './ReviewArticle.css';
import ReviewArticleData from './ReviewArticleData';
import ContentType from '../../../ContentType';

const { Column } = Table;

export default class ReviewArticle extends Component {
  state = {
    articleList: []
  };

  componentWillMount() {
    this.getPendingArticleHandler();
  }

  getPendingArticleHandler = () => {
    const { getPendingArticle } = this.props;
    getPendingArticle()
      .then(res => {
        const {
          data: { data }
        } = res;
        console.log(data);
        this.setState({
          articleList: data.map(value => ({
            key: value.id,
            userId: value.userId,
            articleId: value.id,
            time: moment(value.createTime).format('YYYY-MM-DD HH:mm'),
            articleCover: `http://${value.headPictureUrl}`,
            articleTitle: value.title,
            contentType: value.articleType.id,
            articleIntroduction: value.introduction,
            articleContent: value.content,
            status: value.status
          }))
        });
      })
      .catch(err => {
        message.error(err);
      });
  };
  chooseStatus = status => {
    const switchMap = new Map([
      [0, <Tag color="green">通过</Tag>],
      [1, <Tag color="red">未通过</Tag>],
      [2, <Tag>待审核</Tag>]
    ]);
    return switchMap.get(status);
  };

  changeStatus = (record, result) => () => {
    console.log(record, result);
    const { articleList } = this.state;
    const selectIndex = _.findIndex(
      articleList,
      value => value.key === record.key
    );
    articleList[selectIndex].status = result;
    this.setState({ articleList });
  };

  chooseAction = record => {
    const { status } = record;
    const normalAction = (
      <span>
        <Button
          onClick={this.openDetailsModal(record)}
          style={{ marginRight: 8 }}
        >
          查看详情
        </Button>
        <Popconfirm title="将删除" onConfirm={this.deleteArticle(record)}>
          <Button type="danger">删除</Button>
        </Popconfirm>
      </span>
    );
    const switchMap = new Map([
      [0, normalAction],
      [1, normalAction],
      [
        2,
        <div>
          <Popconfirm
            title="将通过该文章的审核"
            onConfirm={this.changeStatus(record, 'pass')}
          >
            <Button type="primary" style={{ marginRight: 8 }}>
              通过
            </Button>
          </Popconfirm>
          <Popconfirm
            title="将不通过该文章的审核"
            onConfirm={this.changeStatus(record, 'notPass')}
          >
            <Button type="danger" style={{ marginRight: 8 }}>
              不通过
            </Button>
          </Popconfirm>
          {normalAction}
        </div>
      ]
    ]);
    return switchMap.get(status);
  };

  openDetailsModal = record => () => {
    const {
      userId,
      time,
      articleCover,
      articleTitle,
      contentType,
      articleIntroduction,
      articleContent,
      status
    } = record;
    Modal.info({
      title: articleTitle,
      icon: false,
      centered: true,
      width: 1024,
      content: (
        <div>
          <Row className="content-info" type="flex" align="middle">
            <span>{userId}</span>
            <span>{ContentType[contentType]}</span>
            <span>{time}</span>
            {/* <span>{this.chooseStatus(status)}</span> */}
          </Row>
          <Row style={{ marginBottom: 24 }}>简介：{articleIntroduction}</Row>
          <Row style={{ marginBottom: 24 }}>
            <img
              src={articleCover}
              alt="articleCover"
              style={{ width: '100%' }}
            />
          </Row>
          <Divider />
          <Row>
            <div
              className="braft-output-content"
              dangerouslySetInnerHTML={{
                __html: articleContent
              }}
            />
          </Row>
        </div>
      )
    });
  };

  deleteArticle = record => () => {
    const { deleteArticle } = this.props;
    const formData = new FormData();
    formData.append('articleId', record.articleId);
    deleteArticle(formData)
      .then(() => {
        message.success('删除成功');
        this.getPendingArticleHandler();
      })
      .catch(err => {
        message.error(err);
      });
  };

  render() {
    const { articleList } = this.state;
    return (
      <div>
        <Table
          dataSource={articleList}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 10
          }}
        >
          <Column title="用户ID" dataIndex="userId" align="center" />
          <Column title="上传时间" dataIndex="time" align="center" />
          <Column
            title="标题"
            dataIndex="articleTitle"
            align="center"
            render={text => (
              <Tooltip title={text} placement="bottom">
                <div className="admin-long-text">{text}</div>
              </Tooltip>
            )}
          />
          <Column
            title="分类"
            dataIndex="contentType"
            align="center"
            render={text => ContentType[text]}
          />
          <Column
            title="简介"
            dataIndex="articleIntroduction"
            align="center"
            render={text => (
              <Tooltip title={text} placement="bottom">
                <div className="admin-long-text">{text}</div>
              </Tooltip>
            )}
          />
          {/* <Column
            title="当前状态"
            dataIndex="status"
            align="center"
            render={text => this.chooseStatus(text)}
          /> */}
          <Column render={record => this.chooseAction(record)} />
        </Table>
      </div>
    );
  }
}
