import React from 'react'
import { Card, Button, Modal, Table } from 'antd'
import { ajax } from 'common/js/ajax'

export default class Tables extends React.Component {
  state = {
    isShowCreateModal: false,
    isShowPermissionModal: false,
    isShowAuthorizeModal: false
  }
  componentWillMount() {
    this._getRoleList()
  }
  _getRoleList = () => {
    ajax({ url: '/role/list' }).then(res => {
      this.setState({
        roleSource: res.result
      })
    })
  }
  // 创建角色
  handleCreate = () => {

  }
  // 设置权限
  handlePermission = () => {

  }
  // 用户授权
  handleAuthorize = () => {

  }
  // 表头
  columns = [
    { title: '序号', dataIndex: 'id', width: 30, align: 'center' },
    { title: '角色名称', dataIndex: 'role_name', width: 100, align: 'center' },
    { title: '状态', dataIndex: 'state', width: 30, align: 'center' },
    { title: '创建时间', dataIndex: 'create_time', width: 120, align: 'center' },
    { title: '授权时间', dataIndex: 'authorize_time', width: 120, align: 'center' },
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
  render() {
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    return (
      <section>
        <Card className="card-wrapper" size="default">
          <Button type="primary" onClick={this.handleCreate}>创建角色</Button>
          <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
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
            pagination={{
              simple: true
            }}
            size="middle"
          />
        </Card>
      </section>
    )
  }
}