import React, { Component } from 'react';
import { Row, Input, Select, Col, message, Divider, BackTop } from 'antd';

import './Search.css';
import VideoData from '../OfficialData';
import VideoList from '../../../components/VideoList/VideoList';
import ArticleData from '../ArticleData';
import ArticleList from '../../../components/ArticleList/ArticleList';
import UserData from './UserData';
import UserList from '../../../components/UserList/UserList';

const { Search: SearchInput } = Input;
const { Option } = Select;

export default class Search extends Component {
  state = {
    // video article user
    searchType: 'video',
    searchResult: null
  };

  search = value => {
    const { searchType } = this.state;
    if (value === '') {
      message.error('没有输入要搜索的内容');
      return;
    }
    // TODO:修改成从接口拿的数据丢给data
    const switchMap = new Map([
      ['video', VideoData],
      ['article', ArticleData],
      ['user', UserData]
    ]);
    this.setState({
      searchResult: {
        type: searchType,
        data: switchMap.get(searchType)
      }
    });
  };

  chooseList = searchResult => {
    const { type, data } = searchResult;
    const switchMap = new Map([
      ['video', <VideoList videoList={data} />],
      ['article', <ArticleList articleList={data} />],
      ['user', <UserList userList={data} />]
    ]);
    return switchMap.get(type);
  };

  render() {
    const { searchType, searchResult } = this.state;
    return (
      <div style={{ minHeight: 480 }}>
        <div className="section">
          <div className="section-content">
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Select
                  value={searchType}
                  size="large"
                  onChange={value => {
                    this.setState({
                      searchType: value
                    });
                  }}
                  style={{ width: '100%' }}
                >
                  <Option value="video">视频</Option>
                  <Option value="article">文章</Option>
                  <Option value="user">用户</Option>
                </Select>
              </Col>
              <Col span={18}>
                <SearchInput
                  placeholder="请输入搜索内容"
                  size="large"
                  enterButton="搜索"
                  onSearch={this.search}
                />
              </Col>
            </Row>
            {searchResult && (
              <div>
                <Divider />
                <Row>{this.chooseList(searchResult)}</Row>
              </div>
            )}
          </div>
        </div>
        <BackTop visibilityHeight={0}>
          <div className="ant-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
}
