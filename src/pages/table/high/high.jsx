import './high.less'
import React from 'react'
import { Card, Table, Tag, Badge, Button } from 'antd'
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
  // 状态表格字段
  stateConfig =  {
    1: <Badge status="success" text="Success"/>,
    2: <Badge status="default" text="Default" />,
    3: <Badge status="processing" text="Processing" />,
    4: <Badge status="warning" text="Warning" />,
    5: <Badge status="error" text="Error" />
  }
  // 固定表头 上下滚动
  dynamicColumnsY = [
    { title: 'ID', dataIndex: 'id', width: 80, align: 'center' },
    { title: '姓名', dataIndex: 'name', width: 80, align: 'center' },
    { title: '年龄', dataIndex: 'age', width: 80, align: 'center', },
    { title: '邮箱', dataIndex: 'email', width: 200, align: 'center' },
    { title: '电话', dataIndex: 'telephone', width: 200, align: 'center' },
    { title: "技能", dataIndex: "skill", width: 200, align: 'center',
      render: (skill) => {
        return (<Tag color={this.skillConfig[skill].tagColor}>{this.skillConfig[skill].name}</Tag>)
      }
    },
    { title: '等级', dataIndex: 'level', width: 200, align: 'center' },
    { title: '爱好', dataIndex: 'interest', width: 200, align: 'center' }
  ]
  // 排序表格
  dynamicColumnsSort = [
    { title: 'ID', dataIndex: 'id', width: 80, align: 'center',
      sorter: (a, b) => a.id - b.id
    },
    { title: '姓名', dataIndex: 'name', width: 120, align: 'center' },
    { title: '年龄', dataIndex: 'age', width: 200, align: 'center',
      sorter: (a, b) => a.age - b.age,
    },
    { title: '邮箱', dataIndex: 'email', width: 300, align: 'center' },
    { title: '电话', dataIndex: 'telephone', width: 200, align: 'center' },
    { title: "技能", dataIndex: "skill", width: 200, align: 'center',
      render: (skill) => {
        return (<Tag color={this.skillConfig[skill].tagColor}>{this.skillConfig[skill].name}</Tag>)
      }
    },
    { title: '等级', dataIndex: 'level', width: 200, align: 'center',
      sorter: (a, b) => {
        return a.level.length - b.level.length
      }
    },
    { title: '爱好', dataIndex: 'interest', width: 200, align: 'center' }
  ]
  // 有Badge, options的表格
  dynamicColumnsState = [
    { title: 'ID', dataIndex: 'id', width: 80, align: 'center' },
    { title: '姓名', dataIndex: 'name', width: 120, align: 'center' },
    { title: '年龄', dataIndex: 'age', width: 200, align: 'center', },
    { title: '状态', dataIndex: 'state', width: 200, align: 'center',
      render: (state) => {
        return this.stateConfig[state]
      }
    },
    { title: '邮箱', dataIndex: 'email', width: 300, align: 'center' },
    { title: '电话', dataIndex: 'telephone', width: 200, align: 'center' },
    { title: "技能", dataIndex: "skill", width: 200, align: 'center',
      render: (skill) => {
        return (<Tag color={this.skillConfig[skill].tagColor}>{this.skillConfig[skill].name}</Tag>)
      }
    },
    { title: '等级', dataIndex: 'level', width: 200, align: 'center' },
    { title: '操作', width: 300, align: 'center',
      render: (text, item) => {
        return (
          <div className="table-options-wrapper">
            <Button icon="zoom-in" size="small" >查看</Button>
            <Button icon="edit" size="small">编辑</Button>
            <Button icon="delete" size="small">删除</Button>
          </div>
        )
      }
    }
  ]
  // 左右滚动
  dynamicColumnsX = [
    { title: 'ID', dataIndex: 'id', width: 80, align: 'center', fixed: 'left' },
    { title: '姓名', dataIndex: 'name', width: 120, align: 'center', fixed: 'left' },
    { title: '年龄', dataIndex: 'age', width: 200, align: 'center' },
    { title: '邮箱', dataIndex: 'email', width: 300, align: 'center' },
    { title: '电话', dataIndex: 'telephone', width: 200, align: 'center' },
    { title: "技能", dataIndex: "skill", width: 200, align: 'center',
      render: (skill) => {
        return (<Tag color={this.skillConfig[skill].tagColor}>{this.skillConfig[skill].name}</Tag>)
      }
    },
    { title: '等级', dataIndex: 'level', width: 200, align: 'center' },
    { title: '身份证', dataIndex: 'id_card', width: 200, align: 'center' },
    { title: '银行卡', dataIndex: 'bank_card', width: 200, align: 'center' },
    { title: '座驾', dataIndex: 'car', width: 200, align: 'center' },
    { title: '手机品牌', dataIndex: 'phone', width: 200, align: 'center' },
    { title: '爱好', dataIndex: 'interest', width: 200, align: 'center', fixed: 'right' }
  ]
  state = {

  }
  componentWillMount() {
    this._getDynamicTable()
  }
  // 动态获取表格数据
  _getDynamicTable = () => {
    ajax({ url: '/table/high/list' }).then(res => {
      res.result.map(item => item.interest = Object.values(item.interest).join('，'))
      this.setState({
        dynamicDataSource: res.result
      })
    })
  }
  render() {
    return (
      <section>
        <Card title="固定表头-固定高度-能上下滚动" className="card-wrapper" hoverable size="small">
          <Table
            bordered
            rowKey={result => result.id - 1}
            columns={this.dynamicColumnsY}
            dataSource={this.state.dynamicDataSource}
            scroll={{y: 420}}
            size="middle"
            pagination={{
              'simple': true
            }}
          />
        </Card>
        <Card title="固定某些属性-能左右滚动" className="card-wrapper" hoverable size="small">
          <Table
            bordered
            rowKey={result => result.id - 1}
            columns={this.dynamicColumnsX}
            dataSource={this.state.dynamicDataSource}
            scroll={{x: 2290}}
            size="middle"
            pagination={{
              'simple': true
            }}
          />
        </Card>
        <Card title="表格排序" className="card-wrapper" hoverable size="small">
          <Table
            bordered
            rowKey={result => result.id - 1}
            columns={this.dynamicColumnsSort}
            dataSource={this.state.dynamicDataSource}
            size="middle"
            pagination={{
              'simple': true
            }}
          />
        </Card>
        <Card title="Badge and Options" className="card-wrapper" hoverable size="small">
          <Table
            bordered
            rowKey={result => result.id - 1}
            columns={this.dynamicColumnsState}
            dataSource={this.state.dynamicDataSource}
            size="middle"
            pagination={{
              'simple': true
            }}
          />
        </Card>
      </section>
    )
  }
}