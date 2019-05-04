import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Layout,
  Menu,
  Form,
  Input,
  Radio,
  Cascader,
  DatePicker,
  Button,
  Icon,
  Avatar,
  Modal,
  Upload,
  Divider,
  message
} from 'antd';
import Cropper from 'react-cropper';
import moment from 'moment';

import './PersonalSetting.css';
import options from './cascader-address-options';
import testAvatar from '../../../../assets/test-avatar.jpg';

const { Content, Sider } = Layout;
const { Item: MenuItem } = Menu;
const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { confirm } = Modal;

export default Form.create()(
  class PersonalSetting extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userInfo: {
          avatar: testAvatar,
          username: 'testName',
          introduction: '个人介绍',
          sex: '1',
          hometown: '11,1101,110101'
        },
        // changeAvatar changeInfo changePassword
        pageState: 'changeAvatar',
        modalVisible: false,
        tempImage: ''
      };
    }

    selectMenuItem = ({ selectedKeys }) => {
      this.setState({
        pageState: selectedKeys[0]
      });
    };

    openModal = () => {
      this.setState({
        modalVisible: true
      });
    };

    closeModal = () => {
      const { tempImage } = this.state;
      if (tempImage) {
        const that = this;
        confirm({
          title: '上传的头像还未进行更新，确定取消嘛？',
          onOk() {
            that.setState({
              tempImage: '',
              modalVisible: false
            });
          }
        });
      } else {
        this.setState({
          tempImage: '',
          modalVisible: false
        });
      }
    };

    uploadAvatar = file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({ tempImage: reader.result });
      };
      return false;
    };

    updateAvatar = () => {
      const { userInfo } = this.state;
      // 上传用
      // this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      // });
      this.setState({
        userInfo: {
          ...userInfo,
          avatar: this.refs.cropper.getCroppedCanvas().toDataURL()
        },
        tempImage: '',
        modalVisible: false
      });
    };

    confirmPasswordHandler = (rule, value, callback) => {
      const {
        form: { getFieldValue }
      } = this.props;
      if (value && value !== getFieldValue('password')) {
        callback('确认的密码与设置的密码不一致');
      }
      callback();
    };

    choosePage = pageState => {
      const {
        form: { getFieldDecorator }
      } = this.props;
      const {
        userInfo: { avatar, username, introduction, sex, hometown },
        modalVisible,
        tempImage
      } = this.state;
      const switchMap = new Map([
        [
          'changeAvatar',
          <div className="ps-avatar-content">
            <Avatar
              src={avatar}
              size={200}
              icon="user"
              style={{ marginBottom: 16 }}
            />
            <span style={{ marginBottom: 16 }}>当前头像</span>
            <Button onClick={this.openModal}>修改头像</Button>
            <Modal
              visible={modalVisible}
              closable={false}
              centered
              destroyOnClose
              keyboard={false}
              maskClosable={false}
              okButtonProps={{ disabled: !tempImage }}
              okText="更新头像"
              onCancel={this.closeModal}
              onOk={this.updateAvatar}
            >
              <Row type="flex" justify="center">
                {tempImage ? (
                  <div className="ps-upload-content">
                    <Cropper
                      className="ps-cropper"
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
                      minCropBoxWidth={50}
                      preview=".cropper-preview"
                    />
                    <Divider />
                    <div className="cropper-preview" />
                    <div style={{ marginBottom: 16 }}>效果预览</div>
                    <Upload
                      showUploadList={false}
                      beforeUpload={this.uploadAvatar}
                    >
                      <Button>重新选择一张图片</Button>
                    </Upload>
                  </div>
                ) : (
                  <div className="ps-upload-content">
                    <Upload
                      className="avatar-uploader"
                      accept="image/*"
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={this.uploadAvatar}
                    >
                      <Icon
                        type="plus"
                        style={{
                          fontSize: '2rem'
                        }}
                      />
                      <div style={{ marginTop: 16 }}>上传一张图片</div>
                    </Upload>
                    <div>
                      请选择图片上传：大小180 *
                      180像素支持JPG、PNG等格式，图片需小于2M
                    </div>
                  </div>
                )}
              </Row>
            </Modal>
          </div>
        ],
        [
          'changeInfo',
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ width: 400 }}
          >
            <FormItem label="昵称">
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请设置一个昵称' }],
                initialValue: username
              })(<Input />)}
            </FormItem>
            <FormItem label="性别">
              {getFieldDecorator('sex', {
                initialValue: sex
              })(
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="简介">
              {getFieldDecorator('introduction', {
                initialValue: introduction
              })(<TextArea />)}
            </FormItem>
            <FormItem label="家乡">
              {getFieldDecorator('hometown', {
                initialValue: hometown.split(',')
              })(<Cascader options={options} placeholder="点击选择" />)}
            </FormItem>
            <FormItem label="生日">
              {getFieldDecorator('birthday')(
                <DatePicker
                  disabledDate={currentDate =>
                    currentDate > moment().endOf('day')
                  }
                  placeholder="点击选择"
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }}>
              <Button type="primary" size="large" style={{ width: '100%' }}>
                修改
              </Button>
            </FormItem>
          </Form>
        ],
        [
          'changePassword',
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ width: 400 }}
          >
            <FormItem label="当前密码">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '没输入当前密码如何修改呢？' },
                  { max: 18, message: '最多18字符' },
                  {
                    min: 6,
                    message: '至少6个字符'
                  }
                ]
              })(<Input type="password" />)}
            </FormItem>
            <FormItem label="新密码">
              {getFieldDecorator('newPassword', {
                rules: [
                  { required: true, message: '请设置一个新密码' },
                  { max: 18, message: '最多18字符' },
                  {
                    min: 6,
                    message: '至少6个字符'
                  }
                ]
              })(<Input type="password" />)}
            </FormItem>
            <FormItem label="确认密码">
              {getFieldDecorator('confirmPassword', {
                rules: [
                  { required: true, message: '请设置一个新密码' },
                  { max: 18, message: '最多18字符' },
                  {
                    min: 6,
                    message: '至少6个字符'
                  },
                  { validator: this.confirmPasswordHandler }
                ]
              })(<Input type="password" />)}
            </FormItem>
            <FormItem wrapperCol={{ offset: 6 }}>
              <Button type="primary" size="large" style={{ width: '100%' }}>
                修改
              </Button>
            </FormItem>
          </Form>
        ]
      ]);
      return switchMap.get(pageState);
    };

    render() {
      const { pageState } = this.state;
      return (
        <div>
          <Row className="section">
            <div className="section-content">
              <Row style={{ marginBottom: 24 }}>
                <Link to="/index/personal">
                  <Icon type="left" />
                  返回个人中心
                </Link>
              </Row>
              <Layout className="ps-content">
                <Sider width={200} style={{ background: '#ffffff' }}>
                  <Menu
                    selectedKeys={[pageState]}
                    onSelect={this.selectMenuItem}
                    style={{ height: '100%' }}
                  >
                    <MenuItem key="changeAvatar">修改头像</MenuItem>
                    <MenuItem key="changeInfo">修改资料</MenuItem>
                    <MenuItem key="changePassword">修改密码</MenuItem>
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
        </div>
      );
    }
  }
);
