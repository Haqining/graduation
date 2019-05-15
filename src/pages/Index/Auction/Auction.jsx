import React, { Component } from 'react';
import {
  Row,
  Layout,
  Menu,
  Form,
  Input,
  DatePicker,
  Button,
  Icon,
  Modal,
  Upload,
  Divider,
  message,
  InputNumber,
  Table,
  Tag,
  Select,
  Col
} from 'antd';
import Cropper from 'react-cropper';
import moment from 'moment';
import _ from 'lodash';

import './Auction.css';
import StoredProducts from './StoredProducts';

const { Content, Sider } = Layout;
const { Item: MenuItem } = Menu;
const { Item: FormItem } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Column } = Table;

const imageTypes = ['image/jpeg', 'image/png'];

export default Form.create()(
  class Auction extends Component {
    state = {
      // shelf stored
      pageState: 'shelf',
      isCover: true,
      modalVisible: false,
      tempImage: '',
      productCover: '',
      productImages: [],
      storedProducts: [...StoredProducts],
      previewVisible: false,
      previewImage: ''
    };

    selectMenuItem = ({ selectedKeys }) => {
      //在这里阻止一下界面跳转
      const {
        form: { getFieldsValue, resetFields }
      } = this.props;
      const { pageState, productCover, productImages } = this.state;
      let hasData = false;
      if (!_.isEmpty(getFieldsValue())) {
        _.forEach(getFieldsValue(), value => {
          if (value) {
            hasData = true;
          }
        });
      }
      if (
        pageState === 'shelf' &&
        (productCover || !_.isEmpty(productImages) || hasData)
      ) {
        const that = this;
        Modal.confirm({
          title: '填写的内容还未提交，确定离开本页吗？',
          centered: true,
          onOk() {
            resetFields();
            that.setState({
              pageState: selectedKeys[0],
              productCover: '',
              productImages: []
            });
          }
        });
      } else {
        this.setState({
          pageState: selectedKeys[0]
        });
      }
    };

    closeModal = () => {
      const { pageState } = this.state;
      if (pageState === 'shelf') {
        const that = this;
        Modal.confirm({
          title: '截取的图片还未上传，确定取消吗？',
          centered: true,
          icon: '',
          onOk() {
            that.setState({
              modalVisible: false,
              tempImage: ''
            });
          }
        });
      } else {
        this.setState({
          modalVisible: false
        });
      }
    };

    chooseImage = isCover => file => {
      const { size, type } = file;
      if (size > (isCover ? 5 : 2) * 1024 * 1024) {
        message.error('选择的图片过大，请重新选择');
        return false;
      }
      if (!_.includes(imageTypes, type)) {
        message.error('选择了错误的文件类型，请重新选择');
        return false;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({
          isCover: isCover,
          tempImage: reader.result,
          modalVisible: true
        });
      };
      return false;
    };

    uploadImage = () => {
      // 裁切后直接上传服务器用
      // this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      // });
      const { isCover, productImages } = this.state;
      const image = this.refs.cropper.getCroppedCanvas().toDataURL();
      this.setState({
        modalVisible: false,
        tempImage: '',
        ...(isCover
          ? {
              productCover: image
            }
          : {
              modalVisible: false,
              tempImage: '',
              productImages: [...productImages, image]
            })
      });
    };

    // TODO:正常的应该是传url
    deleteProductImage = selectedIndex => () => {
      const { productImages } = this.state;
      const that = this;
      Modal.confirm({
        title: '确定要删除这张图片吗?',
        centered: true,
        okType: 'danger',
        onOk() {
          that.setState({
            productImages: productImages.filter(
              (value, index) => index !== selectedIndex
            )
          });
        }
      });
    };

    chooseTag = status => {
      const switchMap = new Map([
        ['auctioned', <Tag color="green">已拍出</Tag>],
        ['auctioning', <Tag color="red">竞拍中</Tag>]
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
        width: 500,
        content: (
          <Row type="flex" justify="center">
            <div className="auction-details-content">
              <Row>
                <div className="auction-details-label">产品封面</div>
                <Row type="flex" justify="center">
                  <img
                    className="auction-details-cover"
                    src={productCover}
                    alt="productCover"
                  />
                </Row>
              </Row>
              <Row>
                <div className="auction-details-label">产品图片</div>
                <Row type="flex" justify="space-around">
                  {productImages.map((value, index) => (
                    <div
                      className="auction-product-image"
                      key={'productImage' + index}
                    >
                      <img
                        src={value}
                        alt={'productImage' + index}
                        style={{ width: '100%' }}
                      />
                      <span
                        className="auction-image-mask"
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
                  <div className="auction-details-label">产品说明</div>
                  {productIntroduction}
                </Row>
                <Row>
                  <Col span={12}>
                    <span className="auction-details-label">产品类型</span>
                    {productType}
                  </Col>
                  <Col span={12}>
                    <span className="auction-details-label">产品数量</span>
                    {productQuantity}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <span className="auction-details-label">起拍价格</span>
                    {startingPrice}
                  </Col>
                  <Col span={12}>
                    <span className="auction-details-label">加价幅度</span>
                    {priceIncrease}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <span className="auction-details-label">当前价格</span>
                    {currentPrice}
                  </Col>
                  <Col span={12}>
                    <span className="auction-details-label">成交价格</span>
                    {dealPrice}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <span className="auction-details-label">出价人数</span>
                    {bidderNumber}
                  </Col>
                  <Col span={12}>
                    <span className="auction-details-label">出价次数</span>
                    {auctionTimes}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <span className="auction-details-label">上架时间</span>
                    {shelfDate}
                  </Col>
                  <Col span={12}>
                    <span className="auction-details-label">截止时间</span>
                    {deadline}
                  </Col>
                </Row>
                <Row>
                  <span className="auction-details-label">状态</span>
                  {this.chooseTag(status)}
                </Row>
              </Row>
            </div>
          </Row>
        )
      });
    };

    choosePage = pageState => {
      const {
        form: { getFieldDecorator }
      } = this.props;
      const {
        isCover,
        modalVisible,
        tempImage,
        productCover,
        productImages,
        storedProducts,
        previewVisible,
        previewImage
      } = this.state;
      const canUpload = productImages.length < 9;
      const switchMap = new Map([
        [
          'shelf',
          <div>
            <Form style={{ width: 400 }}>
              <FormItem label="产品封面" required>
                <Row type="flex" justify="center">
                  <Upload
                    className="auction-cover-uploader"
                    accept={imageTypes.join()}
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={this.chooseImage(true)}
                  >
                    {productCover ? (
                      <img
                        src={productCover}
                        alt="productCover"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <Icon type="plus" />
                    )}
                  </Upload>
                </Row>
                <div style={{ textAlign: 'center' }}>
                  （支持JPG、PNG格式，需小于5M）
                </div>
              </FormItem>
              <FormItem label="产品图片" required>
                <Row type="flex" justify="end">
                  {productImages.length}/9
                </Row>
                <Row type="flex" justify="space-around">
                  {productImages.map((value, index) => (
                    <div
                      className="auction-product-image"
                      key={'productImage' + index}
                    >
                      <img
                        src={value}
                        alt={'productImage' + index}
                        style={{ width: '100%' }}
                      />
                      <span
                        className="auction-image-mask"
                        onClick={this.deleteProductImage(index)}
                      >
                        <Icon
                          type="close-circle"
                          style={{
                            color: '#f5222d'
                          }}
                        />
                      </span>
                    </div>
                  ))}
                  {canUpload && (
                    <Upload
                      className="auction-image-uploader"
                      accept={imageTypes.join()}
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={this.chooseImage(false)}
                    >
                      <Icon type="plus" />
                    </Upload>
                  )}
                </Row>
                <div style={{ textAlign: 'center' }}>
                  请选择图片上传：支持JPG、PNG格式，需小于2M，最多9张
                </div>
              </FormItem>
              <FormItem label="产品名称">
                {getFieldDecorator('productName', {
                  rules: [
                    { required: true, message: '产品名称是必需的' },
                    {
                      max: 20,
                      message: '不能超过20个字符'
                    }
                  ]
                })(<Input placeholder="不超过20字符" />)}
              </FormItem>
              <FormItem label="产品说明">
                {getFieldDecorator('productIntroduction', {
                  rules: [
                    { required: true, message: '产品说明是必需的' },
                    {
                      max: 120,
                      message: '不能超过120个字符'
                    }
                  ]
                })(
                  <TextArea
                    autosize
                    placeholder="请对产品进行描述（不超过120字符）"
                  />
                )}
              </FormItem>
              <FormItem label="产品类型">
                {getFieldDecorator('productType', {
                  rules: [{ required: true, message: '产品类型是必需的' }]
                })(
                  <Select placeholder="点击选择">
                    <Option value="手机">手机</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="产品数量">
                {getFieldDecorator('productQuantity', {
                  rules: [{ required: true, message: '产品数量是必需的' }]
                })(
                  <InputNumber
                    placeholder="至少为1"
                    precision={0}
                    min={1}
                    step={1}
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
              <FormItem label="起拍价格">
                {getFieldDecorator('startingPrice', {
                  rules: [
                    { required: true, message: '起拍价格是必需的' },
                    {
                      pattern: /^\+?(?:[1-9]\d*(?:\.\d{1,2})?|0\.(?:\d[1-9]|[1-9]\d))$/,
                      message: '请输入正确格式的价格'
                    }
                  ]
                })(
                  <InputNumber
                    placeholder="建议为产品原价百分之六十（单位：元）"
                    precision={2}
                    min={20}
                    step={100}
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
              <FormItem label="加价幅度">
                {getFieldDecorator('priceIncrease', {
                  rules: [
                    { required: true, message: '加价幅度是必需的' },
                    {
                      pattern: /^\+?(?:[1-9]\d*(?:\.\d{1,2})?|0\.(?:\d[1-9]|[1-9]\d))$/,
                      message: '请输入正确格式的价格'
                    }
                  ]
                })(
                  <InputNumber
                    placeholder="单位：元"
                    precision={2}
                    min={20}
                    step={20}
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
              <FormItem label="截止日期">
                {getFieldDecorator('deadline', {
                  rules: [{ required: true, message: '截止日期是必需的' }]
                })(
                  <DatePicker
                    disabledDate={currentDate =>
                      currentDate < moment().add(3, 'days') ||
                      currentDate >
                        moment()
                          .add(3, 'days')
                          .add(1, 'week')
                    }
                    placeholder="点击选择"
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
              <FormItem>
                <Row type="flex" justify="center">
                  <Button
                    type="primary"
                    size="large"
                    style={{ padding: '0 40px' }}
                  >
                    立即上架
                  </Button>
                </Row>
              </FormItem>
            </Form>
            <Modal
              visible={modalVisible}
              closable={false}
              centered
              destroyOnClose
              keyboard={false}
              maskClosable={false}
              okText="上传图片"
              onCancel={this.closeModal}
              onOk={this.uploadImage}
            >
              <Row type="flex" justify="center">
                <div className="auction-upload-content">
                  <Cropper
                    className="auction-cropper"
                    src={tempImage}
                    ref="cropper"
                    viewMode={2}
                    background={false}
                    movable={false}
                    zoomable={false}
                    guides={false}
                    toggleDragModeOnDblclick={false}
                    autoCropArea={1}
                    aspectRatio={1}
                    minCropBoxWidth={100}
                    preview=".auction-image-preview"
                  />
                  <Divider />
                  <div className="auction-image-preview" />
                  <div style={{ marginBottom: 16 }}>效果预览</div>
                  <Upload
                    accept={imageTypes.join()}
                    showUploadList={false}
                    beforeUpload={this.chooseImage(isCover)}
                  >
                    <Button>重新选择一张图片</Button>
                  </Upload>
                </div>
              </Row>
            </Modal>
          </div>
        ],
        [
          'stored',
          <div>
            <Table
              dataSource={storedProducts}
              pagination={{
                hideOnSinglePage: true,
                pageSize: 10
              }}
            >
              <Column title="产品名称" dataIndex="productName" />
              <Column
                title="产品数量"
                dataIndex="productQuantity"
                align="center"
              />
              <Column
                title="起拍价格"
                dataIndex="startingPrice"
                align="center"
              />
              <Column
                title="当前价格"
                dataIndex="currentPrice"
                align="center"
              />
              <Column title="成交价格" dataIndex="dealPrice" align="center" />
              <Column title="上架时间" dataIndex="shelfDate" align="center" />
              <Column title="截止日期" dataIndex="deadline" align="center" />
              <Column
                title="状态"
                dataIndex="status"
                align="center"
                render={text => this.chooseTag(text)}
              />
              <Column
                render={record => {
                  return (
                    <Button onClick={this.openDetailsModal(record)}>
                      查看详情
                    </Button>
                  );
                }}
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
        ]
      ]);
      return switchMap.get(pageState);
    };

    render() {
      const { pageState } = this.state;
      return (
        <div className="section">
          <div className="section-content">
            <Layout className="auction-main-content">
              <Sider width={200} style={{ background: '#ffffff' }}>
                <Menu
                  selectedKeys={[pageState]}
                  onSelect={this.selectMenuItem}
                  style={{ height: '100%' }}
                >
                  <MenuItem key="shelf">产品上架</MenuItem>
                  <MenuItem key="stored">已上架产品</MenuItem>
                </Menu>
              </Sider>
              <Content className="auction-content">
                <Row type="flex" justify="center">
                  {this.choosePage(pageState)}
                </Row>
              </Content>
            </Layout>
          </div>
        </div>
      );
    }
  }
);
