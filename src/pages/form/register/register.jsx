import React from 'react'
import { Card, Form, Modal, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message, InputNumber } from 'antd' 

import './register.less'

class FormRegister extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handleChange = ({ fileList }) => this.setState({ fileList })

  handleBeforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg'
    if (!isJPG) {
      message.error('You can only upload JPG file!')
    }
    const isLt2M = (file.size / 1024 / 1024) < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJPG && isLt2M
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { 
          username, 
          password, 
          sex, 
          age, 
          skill, 
          interest, 
          married, 
          birthday, 
          address,
          getupTime
        } = values

        message.success(`Received values of form: 
          username = ${username}, 
          password = ${password}, 
          sex = ${sex}, 
          age = ${age},
          skill = ${skill},
          interest = ${interest},
          married = ${married},
          birthday = ${birthday._d.toLocaleDateString()},
          address = ${address},
          getupTime = ${getupTime._i}`
        )
      }
    })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        sm: 24,
        md: 4
      },
      wrapperCol: {
        sm: 24,
        md: 6
      }
    }
    const offsetLayout = {
      wrapperCol: {
        sm: 24,
        md: {
          span: 6,
          offset: 4
        }
      }
    }
    return (
      <section>
        <Card title="注册表单" className="card-wrapper" hoverable size="small">
          <Form layout="horizontal" {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="用户名">
              {
                getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名'}]
                })(
                  <Input type="text" prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}></Input>
                )
              }
            </Form.Item>
            <Form.Item label="密码">
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码'}]
                })(
                  <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}></Input>
                )
              }
            </Form.Item>
            <Form.Item label="性别">
              {
                getFieldDecorator('sex', {
                  initialValue: '1'
                })(
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
            <Form.Item label="年龄">
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(
                  <InputNumber min={1} max={130}/>
                )
              }
            </Form.Item>
            <Form.Item label="技能">
              {
                getFieldDecorator('skill', {
                  initialValue: "2"
                })(
                  <Select>
                    <Select.Option value="1">Java</Select.Option>
                    <Select.Option value="2">Javascript</Select.Option>
                    <Select.Option value="3">Python</Select.Option>
                    <Select.Option value="4">C+</Select.Option>
                    <Select.Option value="5">C++</Select.Option>
                    <Select.Option value="6">PHP</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label="爱好">
              {
                getFieldDecorator('interest', {
                  initialValue: ["2", '4', '11']
                })(
                  <Select mode="multiple">
                    <Select.Option value="1">篮球</Select.Option>
                    <Select.Option value="2">足球</Select.Option>
                    <Select.Option value="3">骑行</Select.Option>
                    <Select.Option value="4">游泳</Select.Option>
                    <Select.Option value="5">舞蹈</Select.Option>
                    <Select.Option value="6">唱歌</Select.Option>
                    <Select.Option value="7">电竞</Select.Option>
                    <Select.Option value="8">写作</Select.Option>
                    <Select.Option value="9">阅读</Select.Option>
                    <Select.Option value="10">登山</Select.Option>
                    <Select.Option value="11">跑步</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label="是否已婚">
              {
                getFieldDecorator('married', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Switch/>
                )
              }
            </Form.Item>
            <Form.Item label="生日">
              {
                getFieldDecorator('birthday', {
                  rules: [{ required: true, message: '请选择生日日期' }]
                })(
                  <DatePicker
                    placeholder="请选择日期"
                  />
                )
              }
            </Form.Item>
            <Form.Item label="联系方式">
              {
                getFieldDecorator('address', {
                  initialValue: '四川省成都市高新南区天府软件园'
                })(
                  <Input.TextArea
                    autosize={{
                      minRows: 2,
                      maxRows: 4
                    }}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="早起时间">
              {
                getFieldDecorator('getupTime', {
                  rules: [{ required: true, message: '请选择早起时间' }]
                })(
                  <TimePicker
                    format="HH:mm"
                    placeholder="请选择时间"
                  />
                )
              }
            </Form.Item>
            <Form.Item label="头像">
              {
                getFieldDecorator('avatar')(
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={this.handleBeforeUpload}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                )
              }
            </Form.Item>
            <Form.Item {...offsetLayout}>
              {
                getFieldDecorator('checkbox', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>同意 <a href="#">《相关注册协议》</a></Checkbox>
                )
              }
            </Form.Item>
            <Form.Item {...offsetLayout}>
              {
                getFieldDecorator('checkbox')(
                  <Button htmlType="submit" type="primary">注册</Button>
                )
              }
            </Form.Item>
          </Form>
          <Modal closable={false} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Card>
      </section>
    )
  }
}

export default Form.create({ name: 'form-register'})(FormRegister)