import './basic.less'
import React from 'react'
import { Card, Table, Button, message, Modal, Tag } from 'antd'
import { ajax } from 'common/js/ajax'

export default class Tables extends React.Component {
  // 动态表格技能字典
  skillConfig =  {
    1: { name: 'Java', tagColor: '#137d43' },
    2: { name: 'Javascript', tagColor: '#b5003e' },
    3: { name: 'Python', tagColor: '#007db9'},
    4: { name: 'C', tagColor: '#c38f00' },
    5: { name: 'C++', tagColor: '#9300c3' },
    6: { name: 'PHP', tagColor: '#8a00c3' },
    7: { name: 'Linux', tagColor: '#213554' },
    8: { name: 'Ruby', tagColor: '#288594' },
    9: { name: 'Go', tagColor: '#3677af' },
  }
  state = {
    // 分页
    pageNum: 4,
    pageSize: 10,
    total: 671,
    // 动态表头
    dynamicColumns: [
      { title: 'ID', dataIndex: 'id', width: 40, align: 'center' },
      { title: '姓名', dataIndex: 'name', width: 100, align: 'center' },
      { title: '年龄', dataIndex: 'age', width: 40, align: 'center' },
      { title: '邮箱', dataIndex: 'email', width: 200, align: 'center' },
      { title: '电话', dataIndex: 'telephone', width: 100, align: 'center' },
      { title: "技能", dataIndex: "skill", width: 100, align: 'center',
        render: (skill) => {
          return (<Tag color={this.skillConfig[skill].tagColor}>{this.skillConfig[skill].name}</Tag>)
        }
      },
      { title: '等级', dataIndex: 'level', width: 100, align: 'center' },
      { title: '爱好', dataIndex: 'interest', width: 200, align: 'center' }
    ],
    // 静态表头
    staticColums: [
      { title: 'ID', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'name' },
      { title: '性别', dataIndex: 'sex' },
      { title: '状态', dataIndex: 'state' },
      { title: '生日', dataIndex: 'birthday' },
      { title: '爱好', dataIndex: 'interest' },
      { title: '创建时间', dataIndex: 'createTime' },
      { title: '地址', dataIndex: 'address' }
    ],
    // 静态表数据
    staticDataSource: [
      {
        id: '1',
        name: 'Lucian',
        sex: '男',
        state: '启用',
        birthday: '1999-09-09',
        address: '四川省成都市高新区天府软件园',
        interest: '游泳',
        createTime: '2019-01-01 09:22:11'
      },
      {
        id: '2',
        name: 'Evelyn',
        sex: '女',
        state: '关闭',
        birthday: '2000-01-01',
        address: '四川省成都市高新区天府软件园',
        interest: '跑步',
        createTime: '2019-02-02 11:53:37'
      },
      {
        id: '3',
        name: 'Lax',
        sex: '女',
        state: '启用',
        birthday: '1988-04-30',
        address: '四川省成都市高新区天府软件园',
        interest: '登山',
        createTime: '2019-03-03 15:41:02'
      }
    ]
  }
  componentWillMount() {
    this._getDynamicTable()
  }
  // 动态获取表格数据
  _getDynamicTable = () => {
    ajax({ url: '/table/list' }).then(res => {
      res.result.map(item => item.interest = Object.values(item.interest).join('，'))
      this.setState({
        dynamicColumns: this.state.dynamicColumns,
        dynamicDataSource: res.result
      })
    })
  }
  // 单选表格 点击每行
  handleOnRowClick = (record, index) => {
    let selectedRowKeys = [index]
    this.setState({
      selectedRowKeys,
      selectedItem: record
    }, () => {
      const { name, telephone, skill } = this.state.selectedItem
      message.success(`姓名：${name} ─> 电话：${telephone} ─> 技能：${this.skillConfig[skill].name}`)
    })
  }
  // 复选表格, 点击每行
  handleCheckboxOnRowClick = (record, index) => {
    let { selectedCheckboxRowKeys = [], selectedRows = [] } = this.state
    if (!selectedCheckboxRowKeys.includes(index)) {
      selectedCheckboxRowKeys.unshift(index)
      selectedRows.unshift(record)
      this.setState({
        selectedCheckboxRowKeys,
        selectedRows
      })
    }
  }
  // 复选表格删除
  handleCheckboxDelete = () => {
    let { selectedRows } = this.state
    let deleteIds = selectedRows.map(item => item.id)
    Modal.confirm({
      title: '删除提示',
      content: `删除后将不能恢复，您确认删除这些数据吗？id = [${deleteIds.join(',')}]`,
      onOk: () => {
        // 这里只是简单提示, 如果真要删除, 需要改变this.state.dynamicDataSource数据, 而且单选表格渲染也会同步发生变化
        message.success('删除成功')
        // 清空selectedCheckboxRowKeys, selectedRows, 让页面checkbox全部变成unchecked
        this.setState({
          selectedCheckboxRowKeys: [],
          selectedRows: []
        })
      }
    })
  }
  render() {
    // 单选表格rowSelection
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    // 复选表格rowSelection
    const rowCheckboxSelection = {
      type: 'checkbox',
      selectedRowKeys: this.state.selectedCheckboxRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedCheckboxRowKeys: selectedRowKeys,
          selectedRows
        })
      }
    }
    return (
      <section>
        <Card title="基础表格">
          <Table
            bordered
            rowKey="id"
            columns={this.state.staticColums}
            dataSource={this.state.staticDataSource}
          />
        </Card>
        <Card title="动态单选表格-Mock">
          <Table
            bordered
            rowKey={result => result.id - 1}
            columns={this.state.dynamicColumns}
            dataSource={this.state.dynamicDataSource}
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
        <Card title="动态复选表格-Mock">
          <div className="table-checkbox-delete">
            <Button onClick={this.handleCheckboxDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowKey={result => result.id - 1}
            columns={this.state.dynamicColumns}
            dataSource={this.state.dynamicDataSource}
            rowSelection={rowCheckboxSelection}
            onRow={(result, index) => {
              return {
                // 点击行
                onClick: () => {
                  this.handleCheckboxOnRowClick(result, index)  
                }
              }
            }}
            pagination={{
              current: this.state.pageNum,
              pageSize: this.state.pageSize,
              total: this.state.total,
              showTotal: () => {
                return `共${this.state.total}条, ${Math.ceil(this.state.total / this.state.pageSize)}页`
              },
              onChange: (current) => {
                this.setState({
                  pageNum: current
                })
                this._getDynamicTable()
              },
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['10', '15', '20', '25', '30', '35', '40'],
              hideOnSinglePage: true,
              onShowSizeChange: (current, size) => {
                this.setState({
                  pageSize: size
                })
              }
            }}
          />
        </Card>
      </section>
    )
  }
}