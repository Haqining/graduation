import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import {
  Row,
  Form,
  Upload,
  Icon,
  message,
  Input,
  Select,
  Button,
  Divider,
  Modal
} from 'antd';
import Cropper from 'react-cropper';
import _ from 'lodash';

import './UploadVideo.css';

const { Item: FormItem } = Form;
const { Dragger } = Upload;
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

const videoTypes = ['.mp4', '.flv'];
const imageTypes = ['image/jpeg', 'image/png'];

export default Form.create()(
  class UploadVideo extends Component {
    state = {
      videoList: [],
      videoCover: '',
      tempCover: '',
      modalVisible: false
    };

    uploadVideo = file => {
      const { videoList } = this.state;
      const { name } = file;
      let uploaded = false;
      if (!_.includes(videoTypes, name.slice(-4))) {
        message.error('选择了错误的文件类型，请重新选择');
        return false;
      }
      videoList.forEach(value => {
        if (name === value.name) {
          uploaded = true;
        }
      });
      if (uploaded) {
        message.error(name + '文件已经上传过一次了');
        return false;
      }
      this.setState({
        videoList: [...videoList, file]
      });
      return false;
    };

    removeVideo = () => {
      const { videoList } = this.state;
      this.setState({
        videoList: videoList.filter(value => value.status !== 'removed')
      });
    };

    uploadCover = file => {
      const { size, type } = file;
      if (size > 5 * 1024 * 1024) {
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
        this.setState({ tempCover: reader.result, modalVisible: true });
      };
      return false;
    };

    updateCover = () => {
      // 裁切后直接上传服务器用
      // this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      // });
      this.setState({
        videoCover: this.refs.cropper.getCroppedCanvas().toDataURL(),
        tempCover: '',
        modalVisible: false
      });
    };

    closeModal = () => {
      const that = this;
      confirm({
        title: '图片还未进行上传，确定取消吗？',
        centered: true,
        onOk() {
          that.setState({
            tempCover: '',
            modalVisible: false
          });
        }
      });
    };

    render() {
      const {
        form: { getFieldDecorator, getFieldsValue }
      } = this.props;
      const { videoList, videoCover, tempCover, modalVisible } = this.state;
      let hasData = false;
      if (!_.isEmpty(getFieldsValue())) {
        _.forEach(getFieldsValue(), value => {
          if (value) {
            hasData = true;
          }
        });
      }
      return (
        <Row type="flex" justify="center">
          <Form style={{ width: 800 }}>
            <FormItem label="上传视频" required>
              <Dragger
                accept={videoTypes.join()}
                fileList={videoList}
                beforeUpload={this.uploadVideo}
                onRemove={this.removeVideo}
                style={{ padding: '24px 0' }}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                <p className="ant-upload-hint">支持MP4、FLV格式</p>
              </Dragger>
            </FormItem>
            <FormItem label="标题">
              {getFieldDecorator('videoTitle', {
                rules: [{ required: true, message: '标题是必须的' }]
              })(<Input placeholder="建议30个字符以内" />)}
            </FormItem>
            <FormItem label="封面图片" required>
              <Row type="flex" justify="center">
                <Upload
                  className="uv-cover-uploader"
                  accept={imageTypes.join()}
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={this.uploadCover}
                >
                  {videoCover ? (
                    <img
                      src={videoCover}
                      alt="videoCover"
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
            <FormItem label="分类">
              {getFieldDecorator('contentType', {
                rules: [{ required: true, message: '需要选择一个类型' }]
              })(
                <Select placeholder="点击选择">
                  <Option value="1">手机</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="视频简介">
              {getFieldDecorator('videoIntroduction', {
                rules: [
                  { required: true, message: '视频简介是必需的' },
                  {
                    max: 240,
                    message: '不能超过240个字符'
                  }
                ]
              })(<TextArea autosize placeholder="最多240个字符" />)}
            </FormItem>
            <FormItem>
              <Row type="flex" justify="center">
                <Button
                  type="primary"
                  size="large"
                  style={{ padding: '0 40px' }}
                >
                  立即投稿
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
            okText="上传封面"
            onCancel={this.closeModal}
            onOk={this.updateCover}
          >
            <Row type="flex" justify="center">
              <div className="uv-upload-content">
                <Cropper
                  className="uv-cropper"
                  src={tempCover}
                  ref="cropper"
                  viewMode={2}
                  background={false}
                  movable={false}
                  zoomable={false}
                  guides={false}
                  toggleDragModeOnDblclick={false}
                  autoCropArea={1}
                  aspectRatio={4 / 3}
                  minCropBoxWidth={100}
                  preview=".uv-cover-preview"
                />
                <Divider />
                <div className="uv-cover-preview" />
                <div style={{ marginBottom: 16 }}>效果预览</div>
                <Upload
                  accept={imageTypes.join()}
                  showUploadList={false}
                  beforeUpload={this.uploadCover}
                >
                  <Button>重新选择一张图片</Button>
                </Upload>
              </div>
            </Row>
          </Modal>
          <Prompt
            when={!_.isEmpty(videoList)||videoCover||hasData}
            message="填写的内容还未提交，确定离开本页吗？"
          />
        </Row>
      );
    }
  }
);
