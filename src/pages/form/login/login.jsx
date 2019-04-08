import './login.less'
import React from 'react'
import { Card, Form, Icon, Input, Button, Checkbox, message} from 'antd'

class FormLogin extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password, remember } = values
        message.success(`Received values of form: username = ${username}, password = ${password}, remember me = ${remember}` )
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <section>
        <Card title="行内登录表单" className="card-wrapper" hoverable size="small">
          <Form layout="inline">
            <Form.Item>
              <Input type="text" placeholder="请输入用户名"/>
            </Form.Item>
            <Form.Item>
              <Input type="password" placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary">登录</Button>
            </Form.Item>
          </Form>
        </Card>
      
        <Card title="水平表单" className="card-wrapper" hoverable size="small">
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '用户名不能为空' },
                    { pattern: /^\w+$/g, message: '用户名只能是英文和数字'}
                  ]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />} placeholder="请输入用户名" />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '密码不能为空' },
                    { min: 8, max: 16, message: '密码长度必须是8-16位'}
                  ]
                })(
                  <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />} placeholder="请输入密码" />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>记住我</Checkbox>
                )
              }
              <a className="login-form-forgot" href="">忘记密码</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </section>
    )
  }
}

export default Form.create({ name: 'form-login' })(FormLogin)
