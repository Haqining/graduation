import React, { Component } from 'react';
import { Row, Button, Icon, Modal, Table, Tag, Col, message } from 'antd';

import './StoredProducts.css';
import StoredData from './StoredData';

const { Column } = Table;

export default class StoredProducts extends Component {
  state = {
    modalVisible: false,
    storedProducts: [],
    previewVisible: false,
    previewImage: ''
  };

  componentWillMount() {
    const { getProductsByUserId } = this.props;
    const formData = new FormData();
    formData.append('userId', localStorage.getItem('userId'));
    getProductsByUserId(formData)
      .then(res => {
        const {
          data: { data }
        } = res;
        this.setState({
          storedProducts: data.map(value => ({
            key: value.id,
            id: value.id,
            userId: value.userId,
            productCover: `http://${value.goodsHeadPictureUrl}`,
            productImages: value.urls.map(item => `http://${item.url}`),
            productName: value.goodsName,
            productIntroduction: value.introduce,
            productType: value.type,
            productQuantity: value.goodsMount,
            status: value.status
          }))
        });
      })
      .catch(err => {
        message.error(err);
      });
  }

  chooseStatus = status => {
    const switchMap = new Map([
      ['3', <Tag color="green">已拍出</Tag>],
      ['2', <Tag color="red">竞拍中</Tag>],
      ['4', <Tag>拍卖失败</Tag>]
    ]);
    return switchMap.get(status);
  };

  openDetailsModal = record => () => {
    const {
      productCover,
      productImages,
      productName,
      productIntroduction,
      productType,
      productQuantity,
      startingPrice,
      currentPrice,
      dealPrice,
      priceIncrease,
      bidderNumber,
      auctionTimes,
      shelfDate,
      deadline,
      status
    } = record;
    Modal.info({
      title: productName,
      centered: true,
      icon: false,
      width: 600,
      content: (
        <Row type="flex" justify="center">
          <div className="stored-details-content">
            <Row>
              <div className="stored-details-label">产品封面</div>
              <Row type="flex" justify="center">
                <img
                  className="stored-details-cover"
                  src={productCover}
                  alt="productCover"
                />
              </Row>
            </Row>
            <Row>
              <div className="stored-details-label">产品图片</div>
              <Row type="flex" justify="space-around">
                {productImages.map((value, index) => (
                  <div
                    className="stored-product-image"
                    key={'productImage' + index}
                  >
                    <img
                      src={value}
                      alt={'productImage' + index}
                      style={{ width: '100%' }}
                    />
                    <span
                      className="stored-image-mask"
                      onClick={() =>
                        this.setState({
                          previewVisible: true,
                          previewImage: value
                        })
                      }
                    >
                      <Icon
                        type="eye"
                        style={{
                          color: '#1890ff'
                        }}
                      />
                    </span>
                  </div>
                ))}
              </Row>
              <Row>
                <div className="stored-details-label">产品说明</div>
                {productIntroduction}
              </Row>
              <Row>
                <Col span={12}>
                  <span className="stored-details-label">产品类型</span>
                  {productType}
                </Col>
                <Col span={12}>
                  <span className="stored-details-label">产品数量</span>
                  {productQuantity}
                </Col>
              </Row>
              {/* <Row>
                <Col span={12}>
                  <span className="stored-details-label">起拍价格</span>
                  {startingPrice}
                </Col>
                <Col span={12}>
                  <span className="stored-details-label">加价幅度</span>
                  {priceIncrease}
                </Col>
              </Row> */}
              {/* <Row>
                <Col span={12}>
                  <span className="stored-details-label">当前价格</span>
                  {currentPrice}
                </Col>
                <Col span={12}>
                  <span className="stored-details-label">成交价格</span>
                  {dealPrice}
                </Col>
              </Row> */}
              {/* <Row>
                <Col span={12}>
                  <span className="stored-details-label">出价人数</span>
                  {bidderNumber}
                </Col>
                <Col span={12}>
                  <span className="stored-details-label">出价次数</span>
                  {auctionTimes}
                </Col>
              </Row> */}
              {/* <Row>
                <Col span={12}>
                  <span className="stored-details-label">上架时间</span>
                  {shelfDate}
                </Col>
                <Col span={12}>
                  <span className="stored-details-label">截止时间</span>
                  {deadline}
                </Col>
              </Row> */}
              <Row>
                <span className="stored-details-label">状态</span>
                {this.chooseStatus(status)}
              </Row>
            </Row>
          </div>
        </Row>
      )
    });
  };

  render() {
    const { storedProducts, previewVisible, previewImage } = this.state;
    return (
      <div>
        <Table
          dataSource={storedProducts}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 10
          }}
        >
          <Column title="产品名称" dataIndex="productName" align="center" />
          <Column title="产品数量" dataIndex="productQuantity" align="center" />
          {/* <Column title="起拍价格" dataIndex="startingPrice" align="center" /> */}
          {/* <Column title="当前价格" dataIndex="currentPrice" align="center" /> */}
          {/* <Column title="成交价格" dataIndex="dealPrice" align="center" /> */}
          {/* <Column title="上架时间" dataIndex="shelfDate" align="center" /> */}
          {/* <Column title="截止日期" dataIndex="deadline" align="center" /> */}
          <Column
            title="状态"
            dataIndex="status"
            align="center"
            render={text => this.chooseStatus(text)}
          />
          <Column
            render={record => (
              <Button onClick={this.openDetailsModal(record)}>查看详情</Button>
            )}
          />
        </Table>
        <Modal
          visible={previewVisible}
          centered
          destroyOnClose
          footer={false}
          width={800}
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <img
            src={previewImage}
            alt="previewImage"
            style={{ width: '100%' }}
          />
        </Modal>
      </div>
    );
  }
}
