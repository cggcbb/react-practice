import './basic.less'
import React from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { ajax } from 'common/js/ajax'

export default class Tables extends React.Component {
  // 动态表格技能字典
  skillConfig =  {
    1: 'Java',
    2: 'Javascript',
    3: 'Python',
    4: 'C',
    5: 'C++',
    6: 'PHP',
    7: 'Linux',
    8: 'Ruby',
    9: 'Go'
  }
  state = {
    // 动态表头
    dynamicColumns: [
      { title: 'ID', dataIndex: 'id' },
      { title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' },
      { title: '邮箱', dataIndex: 'email' },
      { title: '电话', dataIndex: 'telephone' },
      { title: "技能", dataIndex: "skill",
        render: (skill) => {
          return this.skillConfig[skill]
        }
      },
      { title: '评价', dataIndex: 'assess' },
      { title: '爱好', dataIndex: 'interest' }
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
      message.success(`姓名：${name} ─> 电话：${telephone} ─> 技能：${this.skillConfig[skill]}`)
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
        <Card title="动态数据渲染单选表单">
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
        <Card title="动态数据渲染复选表单">
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
          />
        </Card>
      </section>
    )
  }
}