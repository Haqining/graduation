import React, { Component } from 'react';
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
import BraftEditor from 'braft-editor';
import _ from 'lodash';

import './UploadArticle.css';

const { Item: FormItem } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

const imageTypes = ['image/jpeg', 'image/png'];
const controls = [
  'undo',
  'redo',
  'separator',
  'headings',
  'bold',
  'text-color',
  'strike-through',
  'separator',
  'blockquote',
  'emoji',
  'separator',
  'hr',
  'list-ul',
  'list-ol',
  'text-align',
  'separator',
  'link'
];

export default Form.create()(
  class UploadArticle extends Component {
    constructor(props) {
      super(props);
      this.state = {
        articleCover: '',
        tempCover: '',
        modalVisible: false
      };
    }

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
        articleCover: this.refs.cropper.getCroppedCanvas().toDataURL(),
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
        form: { getFieldDecorator }
      } = this.props;
      const { articleCover, tempCover, modalVisible } = this.state;
      const extendControls = [
        {
          key: 'ua-editor-uploader',
          type: 'component',
          component: (
            <Upload accept={imageTypes.join()} showUploadList={false}>
              {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
              <button
                className="control-item button upload-button"
                data-title="插入图片"
              >
                <Icon type="picture" theme="filled" />
              </button>
            </Upload>
          )
        }
      ];
      return (
        <Row type="flex" justify="center">
          <div className="ua-content">
            <Form>
              <FormItem label="封面图片" required>
                <Row type="flex" justify="center">
                  <Upload
                    className="ua-cover-uploader"
                    accept={imageTypes.join()}
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={this.uploadCover}
                  >
                    {articleCover ? (
                      <img
                        src={articleCover}
                        alt="articleCover"
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
              <FormItem label="标题">
                {getFieldDecorator('articleTitle', {
                  rules: [
                    { required: true, message: '标题是必需的' },
                    {
                      max: 40,
                      message: '最多40个字符'
                    }
                  ]
                })(<Input placeholder="建议30个字符以内" />)}
              </FormItem>
              <FormItem label="分类">
                {getFieldDecorator('contentType', {
                  rules: [{ required: true, message: '分类是必需的' }]
                })(
                  <Select placeholder="点击选择">
                    <Option value="1">手机</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="文章简介">
                {getFieldDecorator('articleIntroduction', {
                  rules: [
                    { required: true, message: '简介是必需的' },
                    {
                      max: 240,
                      message: '不能超过240个字符'
                    }
                  ]
                })(
                  <TextArea
                    autosize
                    placeholder="最多240个字符"
                  />
                )}
              </FormItem>
              <FormItem label="正文">
                {getFieldDecorator('articleContent', {
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                          callback('正文内容不得为空');
                        } else {
                          callback();
                        }
                      }
                    }
                  ]
                })(
                  <BraftEditor
                    className="ua-editor"
                    placeholder="输入正文内容"
                    controls={controls}
                    extendControls={extendControls}
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
                <div className="ua-upload-content">
                  <Cropper
                    className="ua-cropper"
                    src={tempCover}
                    ref="cropper"
                    viewMode={2}
                    background={false}
                    movable={false}
                    zoomable={false}
                    guides={false}
                    toggleDragModeOnDblclick={false}
                    autoCropArea={1}
                    aspectRatio={16 / 9}
                    minCropBoxWidth={100}
                    preview=".ua-cover-preview"
                  />
                  <Divider />
                  <div className="ua-cover-preview" />
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
          </div>
        </Row>
      );
    }
  }
);
