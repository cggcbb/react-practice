import './permission.less'
import menuConfig from 'config/menuConfig'
import React from 'react'
import { Card, Button, Modal, Table, Badge, Input, Select, Form, message, Tree, Transfer } from 'antd'
import { ajax } from 'common/js/ajax'

export default class Tables extends React.Component {
  roleConfig = {
    'role_name': '角色名称',
    'state': {
      0: '无效',
      1: '有效'
    }
  }
  state = {
    isShowCreateModal: false,
    isShowPermissionModal: false,
    isShowAuthorizeModal: false
  }
  componentWillMount() {
    this._getRoleList()
  }
  // 获取角色列表
  _getRoleList = () => {
    ajax({ url: '/role/list' }).then(res => {
      this.setState({
        roleSource: res.result
      })
    })
  }
  // 获取角色用户授权列表
  _getAuthorizeList = () => {
    ajax({ url: '/authorize/list' }).then(res => {
      this._normalizeAuthorizeList(res.result)
    })
  }
  // 处理角色用户授权列表
  _normalizeAuthorizeList = (dataSource) => {
    // 初始化已选中的用户( status === 1 )
    let targetKeys = dataSource.filter(item => item.status === 1).map(item => item.key)
    this.setState({
      dataSource,
      targetKeys,
      isShowAuthorizeModal: true
    })
  }
  // 创建角色
  handleCreate = () => {
    this.setState({
      isShowCreateModal: true
    })
  }
  // 设置权限
  handlePermission = () => {
    let roleInfo = this.state.selectedItem
    if (!roleInfo || !roleInfo.id) {
      Modal.warn({
        title: '信息',
        content: '请选择一个角色进行设置 ~~~',
        centered: true
      })
      return
    }
    this.setState({
      isShowPermissionModal: true,
      menuInfo: Object.values(this.state.selectedItem.menu_list)
    })
  }
  // 用户授权
  handleAuthorize = () => {
    let roleInfo = this.state.selectedItem
    if (!roleInfo || !roleInfo.id) {
      Modal.warn({
        title: '信息',
        content: '请选择一个角色进行授权 ~~~',
        centered: true
      })
      return
    }
    this._getAuthorizeList()
  }
  // 表头
  columns = [
    { title: '序号', dataIndex: 'id', width: 30, align: 'center' },
    { title: '角色名称', dataIndex: 'role_name', width: 100, align: 'center' },
    { title: '角色类型', dataIndex: 'role_type', width: 100, align: 'center',
      render: role_type => role_type === 1 ? '授权角色' : '业务角色'
    },
    { title: '状态', dataIndex: 'state', width: 30, align: 'center',
      render: (state) => {
        return state === 1 ? <Badge status="success" text="有效"/> : <Badge status="error" text="无效"/>
      }
    },
    { title: '创建时间', dataIndex: 'create_time', width: 120, align: 'center' },
    { title: '授权时间', dataIndex: 'authorize_time', width: 120, align: 'center' },
    { title: "备注", dataIndex: "remark", width: 80, align: 'center' },
    { title: "授权人", dataIndex: "authorize_person", width: 120, align: 'center' }
  ]
  // 单选表格 点击每行
  handleOnRowClick = (record, index) => {
    let selectedRowKeys = [index]
    this.setState({
      selectedRowKeys,
      selectedItem: record
    })
  }
   // 重置 selectedRowKeys 和 selectedItem
   _clearSelected = () => {
    this.setState({
      selectedRowKeys: [],
      selectedItem: {}
    })
  }
  // 创建角色弹窗关闭
  handleCreateCancel = () => {
    this.setState({
      isShowCreateModal: false
    })
  }
  // 创建角色提交
  handleCreateSubmit = () => {
    let createParams = this.createRoleForm.props.form.getFieldsValue()
    for (let key of Object.keys(createParams)) {
      if (!createParams[key]) {
        message.error(`${this.roleConfig[key]}不能为空！`)
        return
      }
    }
    let { role_name, state } = createParams
    message.success(`角色创建成功！角色名称【${role_name}】，状态【${this.roleConfig.state[state]}】`)
    this.setState({
      isShowCreateModal: false
    })
    this._getRoleList()
    this.createRoleForm.props.form.resetFields()
  }
  // 设置权限弹窗关闭
  handlePermissionCancel = () => {
    this.setState({
      isShowPermissionModal: false
    })
  }
  // 设置权限提交
  handlePermissionSubmit = () => {
    const params = this.permissionForm.props.form.getFieldsValue() // eg {role_name: "开发", state: 1}
    // 获取 角色id 和选中的 menus
    params.id = this.state.selectedItem.id
    params.menus = this.state.menuInfo
    ajax({ url: '/role/edit', params }).then(res => {
      message.success(res.msg)
      this.setState({
        isShowPermissionModal: false
      })
      this._getRoleList()
      this._clearSelected()
    })
  }
  // 角色授权弹窗关闭
  handleAuthorizeCancel = () => {
    this.setState({
      isShowAuthorizeModal: false
    })
  }
  // 角色授权弹窗提交
  handleAuthorizeSubmit = () => {
    let params = {}
    params.user_ids = this.state.targetKeys
    params.role_id = this.state.selectedItem.id
    ajax({ url: '/authorize/edit', params }).then(res => {
      message.success(res.msg)
      this.setState({
        isShowAuthorizeModal: false
      })
      this._getRoleList()
      this._clearSelected()
    })
  }
  // 更新选中的权限列表
  updateMenuInfo = (checkedKeys) => {
    this.setState({
      menuInfo: checkedKeys
    })
  }
  // 更新角色用户
  updateTargetKeys = (targetKeys) => {
    this.setState({
      targetKeys
    })
  }
  render() {
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    return (
      <section>
        <Card className="card-wrapper" size="default">
          <Button type="primary" onClick={this.handleCreate}>创建角色</Button>
          <Button type="primary" onClick={this.handlePermission}>权限设置</Button>
          <Button type="primary" onClick={this.handleAuthorize}>用户授权</Button>
        </Card>
        <Card>
          <Table
            bordered
            rowKey={result => result.id - 1}
            columns={this.columns}
            dataSource={this.state.roleSource}
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
        </Card>
        <Modal
          title="创建角色"
          visible={this.state.isShowCreateModal}
          onCancel={this.handleCreateCancel}
          onOk={this.handleCreateSubmit}
          centered
        >
          <CreateRoleForm wrappedComponentRef={createRoleForm => { this.createRoleForm = createRoleForm }}/>
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isShowPermissionModal}
          onCancel={this.handlePermissionCancel}
          onOk={this.handlePermissionSubmit}
          style={{top: 20}}
        >
          <PermissionForm 
            roleInfo={this.state.selectedItem}
            wrappedComponentRef={permissionForm => { this.permissionForm = permissionForm }}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={this.updateMenuInfo}
          />
        </Modal>
        <Modal
          title="用户授权"
          width={800}
          centered
          visible={this.state.isShowAuthorizeModal}
          onCancel={this.handleAuthorizeCancel}
          onOk={this.handleAuthorizeSubmit}
        >
          <AuthorizeForm 
            roleInfo={this.state.selectedItem}
            dataSource={this.state.dataSource}
            targetKeys={this.state.targetKeys}
            patchAuthorize={this.updateTargetKeys}
            wrappedComponentRef={authorizeForm => { this.authorizeForm = authorizeForm }}
          />
        </Modal>
      </section>
    )
  }
}

// 创建角色Modal
class CreateRoleForm extends React.Component {
  render() {
    const layout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 19
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="horizontal" {...layout}>
        <Form.Item label="角色名称">
          {
            getFieldDecorator('role_name', {
              rules: [{required: true, message: '请输入角色名称'}]
            })(
              <Input type="text" placeholder="请输入角色名称"/>
            )
          }
        </Form.Item>
        <Form.Item label="状态">
          {
            getFieldDecorator('state', {
              initialValue: '1'
            })(
              <Select>
                <Select.Option value="1">有效</Select.Option>
                <Select.Option value="0">无效</Select.Option>
              </Select>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}
CreateRoleForm = Form.create({ name: 'CreateRoleForm' })(CreateRoleForm)

// 设置权限Modal
class PermissionForm extends React.Component {
  // 渲染权限树
  renderTreeNodes = (treeData) => {
    return treeData.map(item => {
      if (item.children) {
        return <Tree.TreeNode {...item}>
          {this.renderTreeNodes(item.children)}
        </Tree.TreeNode>
      }
      return <Tree.TreeNode {...item}></Tree.TreeNode>
    })
  }
  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }
  render() {
    const layout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 19
      }
    }
    const { getFieldDecorator } = this.props.form
    const { roleInfo, menuInfo } = this.props
    return (
      <Form className="permission-form" layout="horizontal" {...layout}>
        <Form.Item label="角色名称">
          {
            getFieldDecorator('role_name', {
              initialValue: roleInfo.role_name
            })(
              <Input type="text" disabled/>
            )
          }
        </Form.Item>
        <Form.Item label="状态">
          {
            getFieldDecorator('state', {
              initialValue: roleInfo.state
            })(
              <Select>
                <Select.Option value={1}>有效</Select.Option>
                <Select.Option value={0}>无效</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll
          showLine
          onCheck={(checkedKeys) => {
            this.onCheck(checkedKeys)
          }}
          checkedKeys={menuInfo}
        >
          <Tree.TreeNode title="平台权限" key="platform_all">
            {
              this.renderTreeNodes(menuConfig)
            }
          </Tree.TreeNode>
        </Tree>
      </Form>
    )
  }
}
PermissionForm = Form.create({ name: 'PermissionForm' })(PermissionForm)

// 用户授权Modal
class AuthorizeForm extends React.Component {

  filterOption = (inputValue, option) => {
    return option.user_name.includes(inputValue)
  } 
  handleChange = (targetKeys) => {
    this.props.patchAuthorize(targetKeys)
  }
  render() {
    const layout = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 20
      }
    }
    const { getFieldDecorator } = this.props.form
    const { roleInfo, dataSource, targetKeys } = this.props
    return (
      <Form layout="horizontal" {...layout}>
        <Form.Item label="角色名称">
          {
            getFieldDecorator('role_name', {
              initialValue: roleInfo.role_name
            })(
              <Input type="text" disabled/>
            )
          }
        </Form.Item>
        <Form.Item label="选择用户">
          <Transfer
            listStyle={{width: 280, height: 500}}
            showSearch
            filterOption={this.filterOption}
            dataSource={dataSource}
            titles={['待选用户', '已选用户']}
            targetKeys={targetKeys}
            render={item => item.user_name}
            onChange={this.handleChange}
          />
        </Form.Item>
      </Form>
    )
  }
}
AuthorizeForm = Form.create({ name: 'AuthorizeForm' })(AuthorizeForm)