import React, { Component } from 'react';
import { Table, Tooltip, Tag, Modal, Button, Popconfirm, Row } from 'antd';
import _ from 'lodash';

import './ReviewArticle.css';
import ReviewArticleData from './ReviewArticleData';
import ContentType from '../../../ContentType';

const { Column } = Table;

export default class ReviewArticle extends Component {
  state = {
    articleList: ReviewArticleData
  };

  chooseStatus = status => {
    const switchMap = new Map([
      ['pass', <Tag color="green">通过</Tag>],
      ['notPass', <Tag color="red">未通过</Tag>],
      ['pending', <Tag>待审核</Tag>]
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
      ['pass', normalAction],
      ['notPass', normalAction],
      [
        'pending',
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
      username,
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
            <span>{username}</span>
            <span>{ContentType[contentType]}</span>
            <span>{time}</span>
            <span>{this.chooseStatus(status)}</span>
          </Row>
          <Row style={{ marginBottom: 24 }}>简介：{articleIntroduction}</Row>
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
        </div>
      )
    });
  };

  deleteArticle = record => () => {
    const { articleList } = this.state;
    this.setState({
      articleList: articleList.filter(value => value.key !== record.key)
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
          <Column title="用户" dataIndex="username" align="center" />
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
          <Column
            title="当前状态"
            dataIndex="status"
            align="center"
            render={text => this.chooseStatus(text)}
          />
          <Column render={record => this.chooseAction(record)} />
        </Table>
      </div>
    );
  }
}
