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

const videoTypes = ['video/mp4'];
const imageTypes = ['image/jpeg', 'image/png'];

export default Form.create()(
  class UploadVideo extends Component {
    state = {
      videoList: [],
      videoCover: '',
      tempCover: '',
      modalVisible: false
    };

    beforeVideoUpload = file => {
      const { videoList } = this.state;
      const { type } = file;
      if (!_.isEmpty(videoList)) {
        message.error('只能上传一个视频');
        return false;
      }
      if (!_.includes(videoTypes, type)) {
        message.error('选择了错误的文件类型，请重新选择');
        return false;
      }
      return true;
    };

    uploadVideo = info => {
      const {
        file: { status, response }
      } = info;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success('上传成功');
        this.setState({
          videoList: [response]
        });
      } else if (status === 'error') {
        message.error('上传失败');
      }
    };

    removeVideo = () => {
      this.setState({
        videoList: []
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
      const { uploadImage } = this.props;
      // 裁切后直接上传服务器用
      this.refs.cropper.getCroppedCanvas().toBlob(blob => {
        const formData = new FormData();
        formData.append('file', blob);
        uploadImage(formData).then(res => {
          message.success('封面上传成功');
          const { data } = res;
          this.setState({ videoCover: `http://${data}` });
        });
      });
      this.setState({
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

    saveVideoHandler = () => {
      const {
        form: { validateFields, resetFields },
        saveVideo
      } = this.props;
      const { videoList, videoCover } = this.state;
      validateFields((errors, values) => {
        if (_.isEmpty(videoList)) {
          message.error('需要上传视频');
        } else if (!videoCover) {
          message.error('需要上传一张封面图片');
        } else if (!errors) {
          const { videoTitle, contentType, videoIntroduction } = values;
          const formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('headPictureUrl', videoCover.slice(7));
          formData.append('videoUrl', videoList[0]);
          formData.append('title', videoTitle);
          formData.append('typeId', +contentType);
          formData.append('introduction', videoIntroduction);
          saveVideo(formData)
            .then(() => {
              message.success('上传成功，请等待审核');
              resetFields();
              this.setState({
                videoLsit: [],
                videoCover: ''
              });
            })
            .catch(err => {
              message.error(err);
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
                accept="video/mp4"
                action="http://ngrok.hergua.cn:5000/uploadVideo"
                beforeUpload={this.beforeVideoUpload}
                onChange={this.uploadVideo}
                // onRemove={this.removeVideo}
                style={{ padding: '24px 0' }}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                <p className="ant-upload-hint">支持MP4格式</p>
              </Dragger>
            </FormItem>
            <FormItem label="标题">
              {getFieldDecorator('videoTitle', {
                rules: [
                  { required: true, message: '标题是必须的' },
                  {
                    max: 30,
                    message: '最多30个字符'
                  }
                ]
              })(<Input placeholder="最多30个字符" />)}
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
                  <Option value="1">耳机</Option>
                  <Option value="2">键盘</Option>
                  <Option value="3">鼠标</Option>
                  <Option value="4">显示器</Option>
                  <Option value="5">音箱</Option>
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
                  onClick={this.saveVideoHandler}
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
            when={!_.isEmpty(videoList) || !!videoCover || hasData}
            message="填写的内容还未提交，确定离开本页吗？"
          />
        </Row>
      );
    }
  }
);
