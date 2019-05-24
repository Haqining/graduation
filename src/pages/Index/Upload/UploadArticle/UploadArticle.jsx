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
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
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
    state = {
      articleCover: '',
      tempCover: '',
      modalVisible: false,
      editorState: BraftEditor.createEditorState()
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
          this.setState({ articleCover: `http://${data}` });
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

    saveArticleHandler = () => {
      const {
        form: { validateFields, resetFields },
        saveArticle
      } = this.props;
      const { articleCover, editorState } = this.state;
      validateFields((errors, values) => {
        if (!articleCover) {
          message.error('需要上传一张封面图片');
        } else if (editorState.isEmpty()) {
          message.error('要写好正文内容');
        } else if (!errors) {
          const { articleTitle, contentType, articleIntroduction } = values;
          const formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('headPictureUrl', articleCover.slice(7));
          formData.append('title', articleTitle);
          formData.append('typeId', +contentType);
          formData.append('introduction', articleIntroduction);
          formData.append('content', editorState.toHTML());
          saveArticle(formData)
            .then(() => {
              message.success('上传成功，请等待审核');
              resetFields();
              this.setState({
                articleCover: '',
                editorState: BraftEditor.createEditorState()
              });
            })
            .catch(err => {
              message.error(err);
            });
        }
      });
    };

    insertImage = file => {
      const { uploadImage } = this.props;
      const { editorState } = this.state;
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
        console.log(reader.result);
        const formData = new FormData();
        formData.append('file', this.baseToBlob(reader.result));
        uploadImage(formData).then(res => {
          message.success('插入成功');
          const { data } = res;
          this.setState({
            editorState: ContentUtils.insertMedias(editorState, [
              {
                type: 'IMAGE',
                url: `http://${data}`
              }
            ])
          });
        });
      };
      return false;
    };

    baseToBlob = base => {
      let arr = base.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    };

    render() {
      const {
        form: { getFieldDecorator, getFieldsValue }
      } = this.props;
      const { articleCover, tempCover, modalVisible, editorState } = this.state;
      const extendControls = [
        {
          key: 'ua-editor-uploader',
          type: 'component',
          component: (
            <Upload
              accept={imageTypes.join()}
              showUploadList={false}
              beforeUpload={this.insertImage}
            >
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
      let hasData = false;
      if (!_.isEmpty(getFieldsValue())) {
        _.forEach(getFieldsValue(), value => {
          if (value) {
            hasData = true;
          }
        });
      }
      if (!editorState.isEmpty()) {
        hasData = true;
      }
      return (
        <Row type="flex" justify="center">
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
                    max: 30,
                    message: '最多30个字符'
                  }
                ]
              })(<Input placeholder="最多30个字符" />)}
            </FormItem>
            <FormItem label="分类">
              {getFieldDecorator('contentType', {
                rules: [{ required: true, message: '分类是必需的' }]
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
            <FormItem label="文章简介">
              {getFieldDecorator('articleIntroduction', {
                rules: [
                  { required: true, message: '简介是必需的' },
                  {
                    max: 240,
                    message: '不能超过240个字符'
                  }
                ]
              })(<TextArea autosize placeholder="最多240个字符" />)}
            </FormItem>
            <FormItem label="正文">
              <BraftEditor
                className="ua-editor"
                value={editorState}
                placeholder="输入正文内容"
                controls={controls}
                extendControls={extendControls}
                onChange={editorState => {
                  this.setState({ editorState });
                }}
              />
            </FormItem>
            <FormItem>
              <Row type="flex" justify="center">
                <Button
                  type="primary"
                  size="large"
                  onClick={this.saveArticleHandler}
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
          <Prompt
            when={!!articleCover || hasData}
            message="填写的内容还未提交，确定离开本页吗？"
          />
        </Row>
      );
    }
  }
);
