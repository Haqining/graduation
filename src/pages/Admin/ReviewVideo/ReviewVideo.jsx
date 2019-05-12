import React, { Component } from 'react';
import { Table, Tooltip, Tag, Modal, Button, Popconfirm, Row } from 'antd';
import ReactPlayer from 'react-player';
import _ from 'lodash';

import './ReviewVideo.css';
import ReviewVideoData from './ReviewVideoData';
import ContentType from '../../../ContentType';

const { Column } = Table;

export default class ReviewVideo extends Component {
  state = {
    videoList: ReviewVideoData
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
    const { videoList } = this.state;
    const selectIndex = _.findIndex(
      videoList,
      value => value.key === record.key
    );
    videoList[selectIndex].status = result;
    this.setState({ videoList });
  };

  chooseAction = record => {
    const { status } = record;
    const switchMap = new Map([
      [
        'pass',
        <Button onClick={this.openDetailsModal(record)}>查看详情</Button>
      ],
      [
        'notPass',
        <Button onClick={this.openDetailsModal(record)}>查看详情</Button>
      ],
      [
        'pending',
        <div>
          <Button
            onClick={this.openDetailsModal(record)}
            style={{ marginRight: 8 }}
          >
            查看详情
          </Button>
          <Popconfirm
            title="将通过该视频的审核"
            onConfirm={this.changeStatus(record, 'pass')}
          >
            <Button type="primary" style={{ marginRight: 8 }}>
              通过
            </Button>
          </Popconfirm>
          <Popconfirm
            title="将不通过该视频的审核"
            onConfirm={this.changeStatus(record, 'notPass')}
          >
            <Button type="danger">不通过</Button>
          </Popconfirm>
        </div>
      ]
    ]);
    return switchMap.get(status);
  };

  openDetailsModal = record => () => {
    const {
      username,
      time,
      videoTitle,
      contentType,
      videoUrl,
      videoCover,
      videoIntroduction,
      status
    } = record;
    Modal.info({
      title: videoTitle,
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
          <Row>视频封面:</Row>
          <Row type="flex" justify="center" style={{ marginBottom: 24 }}>
            <img className="rv-cover" src={videoCover} alt="videoCover" />
          </Row>
          <Row type="flex" justify="center" style={{ marginBottom: 24 }}>
            <ReactPlayer
              url={videoUrl}
              width={'unset'}
              height={'unset'}
              controls={true}
            />
          </Row>
          <Row>简介：{videoIntroduction}</Row>
        </div>
      )
    });
  };

  render() {
    const { videoList } = this.state;
    return (
      <div>
        <Table
          dataSource={videoList}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 10
          }}
        >
          <Column title="用户" dataIndex="username" align="center" />
          <Column title="上传时间" dataIndex="time" align="center" />
          <Column
            title="标题"
            dataIndex="videoTitle"
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
            dataIndex="videoIntroduction"
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
