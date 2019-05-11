import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Form, Input, Button } from 'antd';

import './Login.css';

const { Item: FormItem } = Form;

export default Form.create()(
  class Login extends Component {
    login = () => {
      const {
        history: { push }
      } = this.props;
      localStorage.setItem('userId', 'admin');
      push(sessionStorage.getItem('backPath'));
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
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '账号是必需的' }]
                })(<Input placeholder="邮箱/账号" />)}
              </FormItem>
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
                {/* {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>记住我</Checkbox>)} */}
                <Button
                  type="primary"
                  size="large"
                  onClick={this.login}
                  style={{ width: '100%' }}
                >
                  登录
                </Button>
                <Row type="flex" justify="space-between">
                  <span>
                    没有账号？<Link to="/register">去注册</Link>
                  </span>
                  <Link to="forget-password">忘了密码？</Link>
                </Row>
              </FormItem>
            </Form>
          </div>
        </div>
      );
    }
  }
);
