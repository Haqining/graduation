import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Form, Input, Button, Checkbox, message } from 'antd';

import './Register.css';

const { Item: FormItem } = Form;

export default Form.create()(
  class Register extends Component {
    comparePassword = (rule, value, callback) => {
      const {
        form: { getFieldValue }
      } = this.props;
      if (value && value !== getFieldValue('password')) {
        callback('确认的密码与设置的密码不一致');
      }
      callback();
    };

    registerHandler = () => {
      const {
        form: { validateFields },
        history: { push },
        register
      } = this.props;
      validateFields((errors, values) => {
        if (!errors) {
          const { username, confirmPassword } = values;
          const formData = new FormData();
          formData.append('username', username);
          formData.append('password', confirmPassword);
          register(formData)
            .then(res => {
              const {
                data: {
                  data: { id }
                }
              } = res;
              localStorage.setItem('userId', id);
              message.info('注册成功，请登录');
              push('/login');
            })
            .catch(err => {
              message.error('err:' + err);
            });
        }
      });
    };

    render() {
      const {
        form: { getFieldDecorator }
      } = this.props;
      return (
        <div className="user-content user-form-content">
          <div className="user-form">
            <Form style={{ width: 300 }}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '用户名是必需的' },
                    {
                      max: 20,
                      message: '最多20个字符'
                    }
                  ]
                })(<Input placeholder="用户名" />)}
              </FormItem>
              {/* <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: '邮箱是必需的' },
                    { type: 'email', message: '邮箱格式不正确' }
                  ]
                })(<Input placeholder="邮箱" />)}
              </FormItem> */}
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '密码是必需的' },
                    {
                      pattern: /^[a-zA-Z0-9~!@#$%^&*-_=+]{6,18}$/,
                      message: '密码为字母、数字及一些符号的组合,6到18个字符'
                    }
                  ]
                })(<Input type="password" placeholder="密码" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    { required: true, message: '确认密码是必需的' },
                    { max: 18, message: '最多18个字符' },
                    {
                      min: 6,
                      message: '至少6个字符'
                    },
                    { validator: this.comparePassword }
                  ]
                })(<Input type="password" placeholder="确认密码" />)}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  size="large"
                  onClick={this.registerHandler}
                  style={{ width: '100%' }}
                >
                  注册
                </Button>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>我已阅读并同意《注册条款》</Checkbox>)}
                <Row type="flex" justify="end">
                  有账号了？<Link to="/login">去登录</Link>
                </Row>
              </FormItem>
            </Form>
          </div>
        </div>
      );
    }
  }
);
