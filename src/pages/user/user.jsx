import React from 'react'
import { Card, Button, Table, Input, Radio, Modal, Form, notification, message } from 'antd'
import { ajax } from 'common/js/ajax'
import FilterForm from 'components/filter-form/filter-form'

export default class User extends React.Component {
  state = {
    isShowUserFormModal: false
  }
  sexConfig = {
    1: '男',
    2: '女'
  }
  marriedConfig = {
    1: '已婚',
    2: '未婚'
  }
  fieldConfig = {
    'user_name': '用户名',
    'email': '电子邮箱',
    'telephone': '电话号码',
    'address': '联系方式'
  }
  typeConfig = {
    'create': '创建员工',
    'edit': '编辑员工',
    'detail': '员工详情',
    'delete': '删除员工'
  }
  componentWillMount() {
    this._getUserList()
  }
  // 获取user列表
  _getUserList(params = null) {
    ajax({ url: '/user/list', params }).then(res => {
      this.setState({
        dataSource: res.result
      })
    })
  }
  // 表头渲染
  columns = [
    { title: '序列', dataIndex: 'id', width: 40, align: 'center' },
    { title: '用户名', dataIndex: 'user_name', width: 100, align: 'center' },
    { title: '性别', dataIndex: 'sex', width: 100, align: 'center',
      render: sex => this.sexConfig[sex]
    },
    { title: '手机号码', dataIndex: 'telephone', width: 180, align: 'center' },
    { title: '邮箱', dataIndex: 'email', width: 180, align: 'center' },
    { title: '生日', dataIndex: 'birthday', width: 100, align: 'center' },
    { title: '婚姻', dataIndex: 'married', width: 100, align: 'center',
      render: married => this.marriedConfig[married]
    },
    { title: "爱好", dataIndex: "interest", width: 100, align: 'center' },
    { title: '联系地址', dataIndex: 'address', width: 220, align: 'center' },
    { title: '操作员', dataIndex: 'operation_person', width: 100, align: 'center' },
  ]
  // 搜索表单配置
  filterConfig = [
    {
      type: 'INPUT',
      field: 'user_name',
      style: { width: 120, marginRight: 30 },
      placeholder: '用户名'
    },
    {
      type: 'INPUT',
      field: 'telephone',
      style: { width: 120, marginRight: 30 },
      placeholder: '手机号码'
    },
    {
      type: 'SELECT',
      field: 'married',
      style: { width: 120, marginRight: 30 },
      initialValue: ' ',
      list: [
        { value: ' ', name: '全部' },
        { value: '1', name: '已婚' },
        { value: '2', name: '未婚' }
      ]
    }
  ]
  // 点击表格每行
  handleOnRowClick = (record, index) => {
    let selectedRowKeys = [index]
    this.setState({
      selectedRowKeys,
      selectedItem: record
    })
  }
  // 弹窗确定按钮点击事件
  handleSubmit = () => {
    let filedObject = this.userForm.props.form.getFieldsValue()
    let fieldKeyArray = Object.keys(filedObject)
    for (let key of fieldKeyArray) {
      if (!filedObject[key]) {
        message.error(`${this.fieldConfig[key]}不能为空！`)
        return
      }
    }
    let { user_name, sex, married, email, telephone, address } = filedObject
    notification.success({
      message: `${this.typeConfig[this.state.type]}成功`,
      description: `用户名【${user_name}】，性别【${this.sexConfig[sex]}】，婚姻【${this.marriedConfig[married]}】，电子邮箱【${email}】，电话号码【${telephone}】，联系地址【${address}】`,
      style: {
        width: 700,
        marginLeft: -330,
        marginTop: 96
      },
    })
    this.setState({
      isShowUserFormModal: false
    })
    this._getUserList()
    this.userForm.props.form.resetFields()
  }
  // 关闭弹窗
  handleCancel = () => {
    this.setState({
      isShowUserFormModal: false
    })
    this.userForm.props.form.resetFields()
  }
  // 员工操作入口
  handleOperate = (type) => {
    switch (type) {
      case 'create':
        break
      case 'delete': 
        if (this.checkSelected()) {
          this.handleDelete()
        }
        return
      default:
        if (!this.checkSelected()) return
    }
    this.setState({
      type,
      isShowUserFormModal: true,
      title: this.typeConfig[type],
      userInfo: type == 'create' ? {} : this.state.selectedItem
    })
  }
  // 检测是否已选择一条员工信息
  checkSelected = () => {
    let userInfo = this.state.selectedItem
    if (!userInfo) {
      Modal.warn({
        title: '信息',
        content: '请选择一条员工信息 ~~~'
      })
      return false
    }
    return true
  }
  // 删除员工
  handleDelete = () => {
    Modal.confirm({
      title: '信息',
      content: `确认删除序号【${this.state.selectedItem.id}】的员工？`,
      onOk: () => {
        message.success('删除员工成功！')
        this._getUserList()
        this._clearSelected()
      }
    })
  }
  // 重置 selectedRowKeys 和 selectedItem
  _clearSelected = () => {
    this.setState({
      selectedRowKeys: [],
      selectedItem: {}
    })
  }
  render() {
    // 单选rowSelection
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    return (
      <section>
        <Card className="card-wrapper" hoverable>
          <FilterForm formConfig={this.filterConfig}/>
        </Card>
        <Card className="card-wrapper open-city-wrapper" hoverable size="small">
          <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
          <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
          <Button type="primary" icon="search" onClick={() => this.handleOperate('detail')}>员工详情</Button>
          <Button type="danger"  icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
        </Card>
        <div className="content-wrapper">
          <Table
            bordered
            size="middle"
            rowKey={result => result.id - 1}
            columns={this.columns}
            dataSource={this.state.dataSource}
            pagination={{
              simple: true
            }}
            rowSelection={rowSelection}
            onRow={(result, index) => {
              return {
                // 点击行
                onClick: () => {
                  this.handleOnRowClick(result, index)  
                }
              }
            }}
          />
        </div>
        <Modal
          title={this.state.title}
          width={500}
          visible={this.state.isShowUserFormModal}
          onCancel={this.handleCancel}
          onOk={this.handleSubmit}
          // 员工详情不能点击确定按钮
          okButtonProps={{ disabled: this.state.type == 'detail' }}
        >
          <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={userForm => { this.userForm = userForm }}/>
        </Modal>
      </section>
    )
  }
}

// 员工Modal
class UserForm extends React.Component {
  render() {
    const layout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 18
      }
    }
    const radioLayout = {
      wrapperCol: {
        span: 18
      }
    }
    const { getFieldDecorator } = this.props.form
    const { type, userInfo } = this.props
    return (
      <Form layout="horizontal" {...layout}>
        <Form.Item label="用户名">
          {
            getFieldDecorator('user_name', {
              rules: [{ required: true, message: '请输入用户名'}],
              initialValue: userInfo.user_name
            })(
              <Input type="text" placeholder="请输入用户名" disabled={type == 'detail'}/> 
            )
          }
        </Form.Item>
        <Form.Item label="性别">
          {
            getFieldDecorator('sex', {
              initialValue: userInfo.sex
            })(
              <Radio.Group disabled={type == 'detail'}>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label="婚姻">
          {
            getFieldDecorator('married', {
              initialValue: userInfo.married
            })(
              <Radio.Group disabled={type == 'detail'}>
                <Radio value={1}>已婚</Radio>
                <Radio value={2}>未婚</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label="电子邮箱">
          {
            getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入电子邮箱'}],
              initialValue: userInfo.email
            })(
              <Input type="text" placeholder="请输入电子邮箱" disabled={type == 'detail'}/> 
            )
          }
        </Form.Item>
        <Form.Item label="电话号码">
          {
            getFieldDecorator('telephone', {
              rules: [{ required: true, message: '请输入电话号码'}],
              initialValue: userInfo.telephone
            })(
              <Input type="text" placeholder="请输入电话号码" disabled={type == 'detail'}/> 
            )
          }
        </Form.Item>
        <Form.Item label="联系地址">
          {
            getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入联系地址'}],
              initialValue: userInfo.address
            })(
              <Input.TextArea
                autosize={{
                  minRows: 2,
                  maxRows: 4
                }}
                disabled={type == 'detail'}
              />
            )
          }
        </Form.Item>
      </Form>
    )
  }
}
UserForm = Form.create({ name: 'UserForm' })(UserForm)