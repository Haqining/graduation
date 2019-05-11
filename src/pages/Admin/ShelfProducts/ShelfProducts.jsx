import React, { Component } from 'react';
import {
  Row,
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
  Select
} from 'antd';
import Cropper from 'react-cropper';
import moment from 'moment';
import _ from 'lodash';

import './ShelfProducts.css';

const { Item: FormItem } = Form;
const { Option } = Select;
const { TextArea } = Input;

const imageTypes = ['image/jpeg', 'image/png'];

export default Form.create()(
  class ShelfProducts extends Component {
    state = {
      isCover: true,
      modalVisible: false,
      tempImage: '',
      productCover: '',
      productImages: []
    };

    closeModal = () => {
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

    render() {
      const {
        form: { getFieldDecorator }
      } = this.props;
      const {
        isCover,
        modalVisible,
        tempImage,
        productCover,
        productImages
      } = this.state;
      const canUpload = productImages.length < 9;
      return (
        <Row type="flex" justify="center">
          <Form style={{ width: 400 }}>
            <FormItem label="产品封面" required>
              <Row type="flex" justify="center">
                <Upload
                  className="shelf-cover-uploader"
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
                    className="shelf-product-image"
                    key={'productImage' + index}
                  >
                    <img
                      src={value}
                      alt={'productImage' + index}
                      style={{ width: '100%' }}
                    />
                    <span
                      className="shelf-image-mask"
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
                {canUpload ? (
                  <Upload
                    className="shelf-image-uploader"
                    accept={imageTypes.join()}
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={this.chooseImage(false)}
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
                    currentDate < moment().add(2, 'days') ||
                    currentDate >
                      moment()
                        .add(2, 'days')
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
              <div className="shelf-upload-content">
                <Cropper
                  className="shelf-cropper"
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
                  preview=".shelf-image-preview"
                />
                <Divider />
                <div className="shelf-image-preview" />
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
        </Row>
      );
    }
  }
);
