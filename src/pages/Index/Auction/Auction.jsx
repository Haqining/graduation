import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  InputNumber
} from 'antd';
import Cropper from 'react-cropper';
import moment from 'moment';
import _ from 'lodash';

import './Auction.css';

const { Content, Sider } = Layout;
const { Item: MenuItem } = Menu;
const { Item: FormItem } = Form;
const { TextArea } = Input;
const { confirm } = Modal;

const imageTypes = ['image/jpeg', 'image/png'];

export default Form.create()(
  class Auction extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // shelf  stored
        pageState: 'shelf',
        modalVisible: false,
        tempImage: '',
        productImages: []
      };
    }

    selectMenuItem = ({ selectedKeys }) => {
      //在这里阻止一下界面跳转
      const { pageState, productImages } = this.state;
      if (pageState === 'shelf' && !_.isEmpty(productImages)) {
        const that = this;
        confirm({
          title: '将会清除填写的内容，确定跳转吗？',
          centered: true,
          onOk() {
            that.setState({
              pageState: selectedKeys[0]
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
      const that = this;
      confirm({
        title: '截取的图片还未上传，确定取消吗？',
        centered: true,
        onOk() {
          that.setState({
            modalVisible: false,
            tempImage: ''
          });
        }
      });
    };

    chooseProductImage = file => {
      const { size, type } = file;
      if (size > 2 * 1024 * 1024) {
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
        this.setState({ tempImage: reader.result, modalVisible: true });
      };
      return false;
    };

    uploadProductImage = () => {
      // 裁切后直接上传服务器用
      // this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      // });
      const { productImages } = this.state;
      this.setState({
        modalVisible: false,
        tempImage: '',
        productImages: [
          ...productImages,
          this.refs.cropper.getCroppedCanvas().toDataURL()
        ]
      });
    };

    // TODO:正常的应该是传url
    deleteProductImage = selectedIndex => () => {
      const { productImages } = this.state;
      const that = this;
      confirm({
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

    choosePage = pageState => {
      const {
        form: { getFieldDecorator }
      } = this.props;
      const { modalVisible, tempImage, productImages } = this.state;
      const canUpload = productImages.length < 9;
      const switchMap = new Map([
        [
          'shelf',
          <div>
            <Form style={{ width: 400 }}>
              <FormItem label="产品图片">
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
                        className="auction-delete-image"
                        onClick={this.deleteProductImage(index)}
                      >
                        <Icon type="close-circle" />
                      </span>
                    </div>
                  ))}
                  {canUpload ? (
                    <Upload
                      className="auction-image-uploader"
                      accept={imageTypes.join()}
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={this.chooseProductImage}
                    >
                      <Icon type="plus" />
                    </Upload>
                  ) : null}
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
                    min={0}
                    step={100}
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
              <FormItem label="产品数量">
                {getFieldDecorator('productQuantity', {
                  initialValue: 1,
                  rules: [{ required: true, message: '产品数量是必需的' }]
                })(
                  <InputNumber
                    precision={0}
                    min={1}
                    step={1}
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
              onOk={this.uploadProductImage}
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
                    beforeUpload={this.chooseProductImage}
                  >
                    <Button>重新选择一张图片</Button>
                  </Upload>
                </div>
              </Row>
            </Modal>
          </div>
        ],
        ['stored', <div>已上架</div>]
      ]);
      return switchMap.get(pageState);
    };

    render() {
      const { pageState } = this.state;
      return (
        <Row className="section">
          <div className="section-content">
            <Row style={{ marginBottom: 24 }}>
              <Link to="/index/personal">
                <Icon type="left" />
                返回个人中心
              </Link>
            </Row>
            <Layout className="auction-content">
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
              <Content style={{ minHeight: 480 }}>
                <Row type="flex" justify="center">
                  {this.choosePage(pageState)}
                </Row>
              </Content>
            </Layout>
          </div>
        </Row>
      );
    }
  }
);
